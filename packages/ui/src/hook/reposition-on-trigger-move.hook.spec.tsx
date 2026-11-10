import { act, render } from '@testing-library/react';
import { RefObject } from 'react';

import { useRepositionOnTriggerMove } from './reposition-on-trigger-move.hook.js';

type Rect = { left: number; top: number };

const VIEWPORT = { width: 1000, height: 800 };

function fakeElement(rect: Rect, parent: Element = document.body) {
  const element = document.createElement('div');
  element.getBoundingClientRect = () => ({ ...rect, width: 100, height: 40 }) as DOMRect;
  parent.appendChild(element);
  return { element, rect };
}

/**
 * Records every `IntersectionObserver` created by the hook so tests can see what it observes and how, and report
 * an intersection ratio the way the browser would after the observed element moved.
 */
class FakeIntersectionObserver {
  static readonly instances: FakeIntersectionObserver[] = [];
  observed: Element[] = [];
  disconnected = false;

  constructor(
    private readonly callback: (entries: IntersectionObserverEntry[]) => void,
    readonly options: IntersectionObserverInit,
  ) {
    FakeIntersectionObserver.instances.push(this);
  }
  observe(element: Element) {
    this.observed.push(element);
  }
  unobserve() {
    // not used by the hook
  }
  disconnect() {
    this.disconnected = true;
  }
  report(intersectionRatio: number) {
    act(() => this.callback([{ intersectionRatio } as IntersectionObserverEntry]));
  }
}

const latestObserver = () => FakeIntersectionObserver.instances[FakeIntersectionObserver.instances.length - 1];

/**
 * Renders the hook and records every value it returns so the `true -> false -> true` sequence that forces
 * `useOverlayPosition` to recalculate is observable, rather than only the settled value.
 */
function renderTracked(triggerRef: RefObject<Element>, overlayRef: RefObject<Element>, isOpen = true) {
  const values: boolean[] = [];
  function Harness({ isOpen }: { isOpen: boolean }) {
    values.push(useRepositionOnTriggerMove(triggerRef, overlayRef, isOpen));
    return null;
  }
  const utils = render(<Harness isOpen={isOpen} />);
  return { ...utils, values, Harness };
}

function setup(isOpen = true) {
  const trigger = fakeElement({ left: 0, top: 100 });
  const overlay = fakeElement({ left: 0, top: 146 });
  const tracked = renderTracked({ current: trigger.element }, { current: overlay.element }, isOpen);
  const rerenderOpen = (isOpen: boolean) => tracked.rerender(<tracked.Harness isOpen={isOpen} />);
  return { trigger, overlay, rerenderOpen, ...tracked };
}

describe('useRepositionOnTriggerMove', () => {
  beforeEach(() => {
    FakeIntersectionObserver.instances.length = 0;
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    Object.defineProperty(document.documentElement, 'clientWidth', { value: VIEWPORT.width, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: VIEWPORT.height, configurable: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  describe('moves caught by a render of the component', () => {
    it('requests a reposition when a render moves the trigger relative to the overlay', () => {
      const { trigger, values, rerenderOpen } = setup();
      expect(values).toEqual([true]);

      trigger.rect.top = 60; // content above shrank in this render, trigger moved up but overlay stayed
      rerenderOpen(true);

      expect(values).toEqual([true, true, false, true]);
    });

    it('detects a horizontal move as well', () => {
      const { trigger, values, rerenderOpen } = setup();

      trigger.rect.left = 40;
      rerenderOpen(true);

      expect(values).toEqual([true, true, false, true]);
    });

    it('does not request a reposition when trigger and overlay move together (page scroll)', () => {
      const { trigger, overlay, values, rerenderOpen } = setup();

      trigger.rect.top -= 50;
      overlay.rect.top -= 50;
      rerenderOpen(true);

      expect(values).toEqual([true, true]);
    });

    it('does not treat the overlay catching up with the trigger as another move, and keeps tracking after it', () => {
      const { trigger, overlay, values, rerenderOpen } = setup();

      trigger.rect.top = 60;
      rerenderOpen(true); // reposition requested
      expect(values).toEqual([true, true, false, true]);

      overlay.rect.top = 106; // overlay repositioned to follow the trigger
      rerenderOpen(true);
      expect(values).toEqual([true, true, false, true, true]);

      trigger.rect.top = 20; // a second shift must still be detected against the new baseline
      rerenderOpen(true);
      expect(values).toEqual([true, true, false, true, true, true, false, true]);
    });
  });

  describe('moves caught without a render of the component', () => {
    it('observes the trigger through a root shrunk to exactly its box, so any move changes the ratio', () => {
      const { trigger } = setup();
      const [observer] = FakeIntersectionObserver.instances;

      expect(observer.observed).toEqual([trigger.element]);
      // trigger box: left 0, top 100, 100x40 in a 1000x800 viewport
      expect(observer.options).toEqual({ root: document, rootMargin: '-100px -900px -660px 0px', threshold: 1 });
    });

    it('requests a reposition when the trigger leaves the observed box, and watches its new position', () => {
      const { trigger, values } = setup();
      const [observer] = FakeIntersectionObserver.instances;
      observer.report(1); // initial notification: still fully inside the box

      trigger.rect.top = 140; // e.g. an image finished loading above the trigger, inside a fixed-height container
      observer.report(0.5);

      expect(values).toEqual([true, false, true]);
      expect(observer.disconnected).toBe(true);
      expect(latestObserver().options.rootMargin).toBe('-140px -900px -620px 0px');
    });

    it('requests a reposition when the ratio is still reported as 1 but the trigger has moved', () => {
      const { trigger, values } = setup();
      const [observer] = FakeIntersectionObserver.instances;

      trigger.rect.top = 140;
      observer.report(1);

      expect(values).toEqual([true, false, true]);
      expect(observer.disconnected).toBe(true);
    });

    it('does not request a reposition for a trigger that is partially off-screen but has not moved', () => {
      const { values } = setup();
      const [observer] = FakeIntersectionObserver.instances;

      observer.report(0.4); // initial notification: 40% visible, e.g. the trigger is partly below the fold

      expect(values).toEqual([true]);
      expect(observer.disconnected).toBe(true);
      expect(latestObserver().options.threshold).toBe(0.4); // a move is now any change from 40%

      latestObserver().report(0.4); // initial notification of the new observer: nothing changed
      expect(values).toEqual([true]);
      expect(FakeIntersectionObserver.instances).toHaveLength(2);
    });

    it('throttles re-observing a trigger that is clipped out of view to once a second', () => {
      vi.useFakeTimers();
      const { values } = setup();
      const [observer] = FakeIntersectionObserver.instances;

      observer.report(0); // initial notification: scrolled out of its container
      expect(FakeIntersectionObserver.instances).toHaveLength(1);

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(values).toEqual([true]);
      expect(FakeIntersectionObserver.instances).toHaveLength(2);
      expect(latestObserver().options.threshold).toBe(1e-7);
    });

    it('does nothing while closed and stops watching once closed', () => {
      const { trigger, values, rerenderOpen } = setup(false);
      expect(FakeIntersectionObserver.instances).toHaveLength(0);

      trigger.rect.top = 60;
      rerenderOpen(false);
      expect(values).toEqual([true, true]);

      rerenderOpen(true); // baseline taken on open
      const [observer] = FakeIntersectionObserver.instances;
      rerenderOpen(false);
      expect(observer.disconnected).toBe(true);

      trigger.rect.top = 20;
      rerenderOpen(false);
      observer.report(0);

      // Only the rerenders were added, no false/true toggle after closing
      expect(values).toEqual([true, true, true, true, true]);
    });

    it('starts from a fresh baseline when reopened after the trigger moved while closed', () => {
      const { trigger, values, rerenderOpen } = setup();

      rerenderOpen(false);
      trigger.rect.top = 60; // moved while closed; the overlay will be positioned against this on open
      rerenderOpen(true);

      expect(values).toEqual([true, true, true]);
    });
  });
});

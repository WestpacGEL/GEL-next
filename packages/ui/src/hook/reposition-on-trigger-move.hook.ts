import { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type Point = { left: number; top: number };
type Snapshot = { trigger: Point; overlay: Point };

const toPoint = ({ left, top }: DOMRect): Point => ({ left, top });
const samePoint = (a: Point, b: Point) => a.left === b.left && a.top === b.top;
const sameRect = (a: DOMRect, b: DOMRect) =>
  a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height;
const offset = ({ trigger, overlay }: Snapshot): Point => ({
  left: trigger.left - overlay.left,
  top: trigger.top - overlay.top,
});

/**
 * Calls `onMove` whenever `element` changes position in the viewport, whatever caused it (a layout shift anywhere
 * on the page, a scroll, a transform). Ported from floating-ui's `autoUpdate` (`layoutShift` option).
 *
 * An `IntersectionObserver` is created with a root margin that shrinks the viewport down to exactly the element's
 * current box, so the element fully intersects it (ratio 1). Any movement changes the ratio, which fires the
 * callback; the observer is then re-created around the new position. Nothing runs while the element is still.
 *
 * Returns a function that stops observing.
 */
function observeMove(element: Element, onMove: () => void): () => void {
  const root = element.ownerDocument.documentElement;
  let observer: IntersectionObserver | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  function cleanup() {
    clearTimeout(timeoutId);
    observer?.disconnect();
    observer = null;
  }

  function refresh(skip = false, threshold = 1) {
    cleanup();

    const rectAtCreation = element.getBoundingClientRect();
    const { left, top, width, height } = rectAtCreation;
    if (!skip) onMove();
    if (!width || !height) return;

    const insetTop = Math.floor(top);
    const insetRight = Math.floor(root.clientWidth - (left + width));
    const insetBottom = Math.floor(root.clientHeight - (top + height));
    const insetLeft = Math.floor(left);
    const options: IntersectionObserverInit = {
      rootMargin: `${-insetTop}px ${-insetRight}px ${-insetBottom}px ${-insetLeft}px`,
      threshold: Math.max(0, Math.min(1, threshold)) || 1,
    };

    let isFirstUpdate = true;
    function handleObserve(entries: IntersectionObserverEntry[]) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) return refresh();
        if (!ratio) {
          // The element is clipped (e.g. scrolled out of a container), so the ratio is 0. Throttle the refresh
          // to avoid an endless loop of updates while it stays clipped.
          timeoutId = setTimeout(() => refresh(false, 1e-7), 1000);
        } else {
          // Partially off-screen: watch for any change from the current ratio instead of from 1.
          refresh(false, ratio);
        }
      }
      // Under load the browser can report a ratio of 1 after the element has already moved out of the observed
      // box; comparing against the rect the observer was created around catches that.
      if (ratio === 1 && !sameRect(rectAtCreation, element.getBoundingClientRect())) refresh();
      isFirstUpdate = false;
    }

    try {
      // Using the document as root handles the element being inside an <iframe>; older browsers throw on it.
      observer = new IntersectionObserver(handleObserve, { ...options, root: root.ownerDocument });
    } catch {
      observer = new IntersectionObserver(handleObserve, options);
    }
    observer.observe(element);
  }

  refresh(true);
  return cleanup;
}

/**
 * react-aria's `usePopover` only recalculates the overlay position when the window, trigger or overlay *resizes*.
 * If the trigger *moves* without resizing (e.g. content above it is conditionally rendered and shifts the layout),
 * the overlay is left behind. See https://github.com/adobe/react-spectrum/issues/6424.
 *
 * While the overlay is open this hook compares the trigger's position against the overlay's whenever something
 * could have moved it: after every render of the calling component (covers shifts caused by React state, before
 * the browser paints) and whenever the trigger's position in the viewport changes (covers everything else: shifts
 * from outside React such as an image loading above it, and React updates that don't re-render this component,
 * even when they happen inside a fixed-size container that no `ResizeObserver` would see change). Nothing runs
 * while the page is idle.
 *
 * Only a move of the *trigger* that changes its offset from the overlay counts: page scroll moves both by the same
 * amount, and the overlay moving on its own is it catching up with the trigger (or flipping), neither of which needs
 * another recalculation. When a move is detected, the returned `shouldUpdatePosition` flag flips to `false` for one
 * render and back to `true`, which re-runs `useOverlayPosition`'s layout effect. Pass the result as the
 * `shouldUpdatePosition` option of `usePopover`.
 */
export function useRepositionOnTriggerMove(
  triggerRef: RefObject<Element | null>,
  overlayRef: RefObject<Element | null>,
  isOpen: boolean,
): boolean {
  const [shouldUpdatePosition, setShouldUpdatePosition] = useState(true);
  const lastSnapshot = useRef<Snapshot>();

  const check = useCallback(() => {
    const trigger = triggerRef.current?.getBoundingClientRect();
    const overlay = overlayRef.current?.getBoundingClientRect();
    if (!trigger || !overlay) return;

    const previous = lastSnapshot.current;
    const current: Snapshot = { trigger: toPoint(trigger), overlay: toPoint(overlay) };
    lastSnapshot.current = current;
    if (!previous) return;

    const triggerMoved = !samePoint(current.trigger, previous.trigger);
    const offsetChanged = !samePoint(offset(current), offset(previous));
    if (triggerMoved && offsetChanged) setShouldUpdatePosition(false);
  }, [triggerRef, overlayRef]);

  // Runs after every render while open so a layout shift committed by React is caught before paint.
  useLayoutEffect(() => {
    if (isOpen) check();
  });

  // Catches moves that happen without a render of this component, whatever caused them.
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!isOpen || !trigger) return;

    const stopObserving = observeMove(trigger, check);

    return () => {
      stopObserving();
      lastSnapshot.current = undefined;
    };
  }, [isOpen, triggerRef, check]);

  // `useOverlayPosition` skips its calculation while the flag is `false`, so flip it straight back to `true`
  // to trigger the recalculation with the trigger's new position.
  useEffect(() => {
    if (!shouldUpdatePosition) setShouldUpdatePosition(true);
  }, [shouldUpdatePosition]);

  return shouldUpdatePosition;
}

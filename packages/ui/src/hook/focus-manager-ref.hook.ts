'use client';

import { createFocusManager } from '@react-aria/focus';
import { ForwardedRef, RefObject, useImperativeHandle, useRef } from 'react';

/**
 * Imperative handle exposed by group fields (`RadioGroup`, `CheckboxGroup`, `Selector`, `ButtonGroup`) whose
 * focusable control is not a single element the group can point a DOM ref at.
 *
 * `focus()` moves focus to the group's first tabbable option at call time, which is what form libraries
 * such as react-hook-form need (`field.ref` → `ref.focus()` on validation error).
 */
export type FocusHandle = {
  focus: () => void;
};

export type UseFocusManagerRefOptions = {
  /**
   * Restricts which descendants of the wrapper may receive focus, e.g. only `<input>`s when the wrapper also
   * contains other controls (such as a "show more" button).
   */
  accept?: (node: Element) => boolean;
};

/**
 * Bridges a forwarded {@link FocusHandle} ref to a wrapper element. Returns the ref to attach to the
 * wrapper; `focus()` on the forwarded handle focuses the first tabbable descendant via react-aria's
 * focus manager. Resolution happens when `focus()` is called, so options that render, enable or
 * disable after mount are handled, and roving-tabindex groups (radios) focus their tab stop
 * (the selected option) rather than the first option. When no option is tabbable (e.g. a radio
 * group whose `value` matches no radio, such as `''`), the first focusable option is used instead.
 */
export function useFocusManagerRef<T extends HTMLElement = HTMLDivElement>(
  forwardedRef: ForwardedRef<FocusHandle>,
  { accept }: UseFocusManagerRefOptions = {},
): RefObject<T> {
  const wrapperRef = useRef<T>(null);

  useImperativeHandle(
    forwardedRef,
    () => ({
      focus: () => {
        const focusManager = createFocusManager(wrapperRef);
        if (!focusManager.focusFirst({ tabbable: true, accept })) {
          focusManager.focusFirst({ accept });
        }
      },
    }),
    [accept],
  );

  return wrapperRef;
}

/** `accept` predicate for groups whose options are `<input>` elements. */
export const acceptInputs = (node: Element) => node.tagName === 'INPUT';

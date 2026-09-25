'use client';

import React, { ForwardedRef, forwardRef } from 'react';

import { FocusHandle } from '../../hook/focus-manager-ref.hook.js';

import {
  SelectorButtonGroup,
  SelectorCheckboxGroup,
  SelectorLinkGroup,
  SelectorRadioGroup,
} from './components/index.js';
import { type SelectorProps } from './selector.types.js';

// TODO: react-aria doesn't consider the click as focus. so the focusRing will appeared just with the tab.
function BaseSelector(
  props: SelectorProps,
  // `ref.current.focus()` (e.g. react-hook-form focusing a field with a validation error) moves
  // focus to the first tabbable option (radio/checkbox input or button).
  // The `link` type is navigation, not a form field, and does not receive the ref.
  ref: ForwardedRef<FocusHandle>,
) {
  if (props.type === 'checkbox') {
    return <SelectorCheckboxGroup {...props} ref={ref} />;
  }
  if (props.type === 'radio') {
    return <SelectorRadioGroup {...props} ref={ref} />;
  }
  if (props.type === 'button') {
    return <SelectorButtonGroup {...props} ref={ref} />;
  }
  if (props.type === 'link') {
    return <SelectorLinkGroup {...props} />;
  }
}

export const Selector = forwardRef(BaseSelector);
Selector.displayName = 'Selector';

'use client';

import React from 'react';

import {
  SelectorButtonGroup,
  SelectorCheckboxGroup,
  SelectorLinkGroup,
  SelectorRadioGroup,
} from './components/index.js';
import { type SelectorProps } from './selector.types.js';

// TODO: react-aria doesn't consider the click as focus. so the focusRing will appeared just with the tab.
export function Selector(props: SelectorProps) {
  if (props.type === 'checkbox') {
    return <SelectorCheckboxGroup {...props} />;
  }
  if (props.type === 'radio') {
    return <SelectorRadioGroup {...props} />;
  }
  if (props.type === 'button') {
    return <SelectorButtonGroup {...props} />;
  }
  if (props.type === 'link') {
    return <SelectorLinkGroup {...props} />;
  }
}

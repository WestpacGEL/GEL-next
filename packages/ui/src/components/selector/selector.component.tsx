'use client';

import React from 'react';

import {
  FlexiCellAdornment,
  FlexiCellBody,
  FlexiCellButton,
  FlexiCellCircle,
  FlexiCellFooter,
  FlexiCellHint,
} from '../flexi-cell/components/index.js';

import {
  SelectorButtonGroup,
  SelectorCheckboxGroup,
  SelectorLinkGroup,
  SelectorRadioGroup,
} from './components/index.js';
import { SelectorButtonGroupOption } from './components/selector-button-group/components/index.js';
import { SelectorCheckboxGroupOption } from './components/selector-checkbox-group/components/index.js';
import { SelectorLabel } from './components/selector-label/index.js';
import { SelectorLinkGroupOption } from './components/selector-link-group/components/index.js';
import { SelectorRadioGroupOption } from './components/selector-radio-group/components/index.js';
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

Selector.Radio = SelectorRadioGroupOption;
Selector.Checkbox = SelectorCheckboxGroupOption;
Selector.Link = SelectorLinkGroupOption;
Selector.ButtonOption = SelectorButtonGroupOption;
Selector.Body = FlexiCellBody;
Selector.Footer = FlexiCellFooter;
Selector.Adornment = FlexiCellAdornment;
Selector.Hint = FlexiCellHint;
Selector.Label = SelectorLabel;
Selector.Button = FlexiCellButton;
Selector.Circle = FlexiCellCircle;

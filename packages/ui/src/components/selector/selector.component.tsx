import React from 'react';

import {
  FlexiCellAdornment,
  FlexiCellBody,
  FlexiCellButton,
  FlexiCellCircle,
  FlexiCellFooter,
  FlexiCellHint,
  FlexiCellLabel,
} from '../flexi-cell/components/index.js';

import { SelectorCheckboxGroup, SelectorRadioGroup } from './components/index.js';
import { SelectorCheckboxGroupOption } from './components/selector-checkbox-group/components/index.js';
import { SelectorRadioGroupOption } from './components/selector-radio-group/components/index.js';
import { type SelectorProps } from './selector.types.js';

// TODO: react-aria doesn't consider the click as focus. so the focusRing will appeared just with the tab.
export function Selector(props: SelectorProps) {
  if (props.type === 'checkbox') {
    return <SelectorCheckboxGroup {...props} />;
  }
  return <SelectorRadioGroup {...props} />;
}

Selector.Radio = SelectorRadioGroupOption;
Selector.Checkbox = SelectorCheckboxGroupOption;
Selector.Body = FlexiCellBody;
Selector.Footer = FlexiCellFooter;
Selector.Adornment = FlexiCellAdornment;
Selector.Hint = FlexiCellHint;
Selector.Label = FlexiCellLabel;
Selector.Button = FlexiCellButton;
Selector.Circle = FlexiCellCircle;

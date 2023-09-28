import React from 'react';

import { FlexiCell } from '../index.js';

import { SelectorCheckboxGroup, SelectorRadioGroup } from './components/index.js';
import { SelectorCheckboxGroupOption } from './components/selector-checkbox-group/components/index.js';
import { SelectorRadioGroupOption } from './components/selector-radio-group/components/index.js';
import { type SelectorProps } from './selector.types.js';

export function Selector(props: SelectorProps) {
  if (props.type === 'checkbox') {
    return <SelectorCheckboxGroup {...props} />;
  }
  return <SelectorRadioGroup {...props} />;
}

Selector.Radio = SelectorRadioGroupOption;
Selector.Checkbox = SelectorCheckboxGroupOption;
Selector.Body = FlexiCell.Body;
Selector.Footer = FlexiCell.Footer;
Selector.Adornment = FlexiCell.Adornment;
Selector.Hint = FlexiCell.Hint;
Selector.Label = FlexiCell.Label;
Selector.Button = FlexiCell.Button;
Selector.Circle = FlexiCell.Circle;

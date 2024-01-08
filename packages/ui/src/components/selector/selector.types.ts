import { ReactNode } from 'react';

import {
  type SelectorButtonGroupProps,
  type SelectorCheckboxGroupProps,
  type SelectorLinkGroupProps,
  type SelectorRadioGroupProps,
} from './components/index.js';

export type SelectorPropsPerType = {
  button: {
    /**
     * Type button
     */
    type: 'button';
  } & SelectorButtonGroupProps;
  checkbox: {
    children: ReactNode;
    /**
     * Type checkbox
     */
    type: 'checkbox';
  } & SelectorCheckboxGroupProps;
  link: {
    /**
     * Type link
     */
    type: 'link';
  } & SelectorLinkGroupProps;
  radio: {
    children: ReactNode;
    /**
     * Type Radio
     */
    type: 'radio';
  } & SelectorRadioGroupProps;
};

export type SelectorPropsType = keyof SelectorPropsPerType;

export type SelectorProps<K extends SelectorPropsType = SelectorPropsType> = SelectorPropsPerType[K] & {
  /**
   * <Selector.Radio /> | <Selector.Checkbox /> children
   */
  children?: ReactNode;
};

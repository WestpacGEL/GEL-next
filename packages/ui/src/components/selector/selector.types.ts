import { ReactNode } from 'react';

import { type SelectorCheckboxGroupProps, type SelectorRadioGroupProps } from './components/index.js';

export type SelectorPropsPerType = {
  checkbox: {
    children: ReactNode;
    /**
     * Type checkbox
     */
    type: 'checkbox';
  } & SelectorCheckboxGroupProps;
  radio: {
    children: ReactNode;
    /**
     * Type Radio
     */
    type: 'radio';
  } & SelectorRadioGroupProps;
};

export type SelectorPropsType = keyof SelectorPropsPerType;

export type SelectorProps<K extends SelectorPropsType = SelectorPropsType> = SelectorPropsPerType[K];

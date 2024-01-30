'use client';

import React, { createContext } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { ErrorMessage, Hint, Label } from '../../../index.js';

import { SelectorCheckboxGroupOption } from './components/index.js';
import { styles } from './selector-checkbox-group.styles.js';
import {
  type SelectorCheckboxGroupContextState,
  type SelectorCheckboxGroupProps,
} from './selector-checkbox-group.types.js';

export const SelectorCheckboxGroupContext = createContext<SelectorCheckboxGroupContextState>({
  value: [],
  isDisabled: false,
  isReadOnly: false,
  isSelected: () => false,
  setValue: () => null,
  addValue: () => null,
  removeValue: () => null,
  toggleValue: () => null,
  validationState: 'valid',
});

export function SelectorCheckboxGroup(props: SelectorCheckboxGroupProps) {
  const { children, label, description, errorMessage } = props;
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } = useCheckboxGroup(props, state);

  return (
    <div {...groupProps} className={styles({ className: groupProps.className })}>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <SelectorCheckboxGroupContext.Provider value={state}>{children}</SelectorCheckboxGroupContext.Provider>
    </div>
  );
}

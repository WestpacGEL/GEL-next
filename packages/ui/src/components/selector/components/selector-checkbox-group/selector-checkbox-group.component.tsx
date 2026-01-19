'use client';

import React, { createContext } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { FUNCTION_NOT_IMPLEMENTED } from '../../../../constants/message.js';
import { ErrorMessage, Hint, Label } from '../../../index.js';

import { styles } from './selector-checkbox-group.styles.js';
import {
  type SelectorCheckboxGroupContextState,
  type SelectorCheckboxGroupProps,
} from './selector-checkbox-group.types.js';

export const SelectorCheckboxGroupContext = createContext<SelectorCheckboxGroupContextState>({
  value: [],
  defaultValue: [],
  isDisabled: false,
  isReadOnly: false,
  isSelected: () => false,
  setValue: () => null,
  addValue: () => null,
  removeValue: () => null,
  toggleValue: () => null,
  validationState: 'valid',
  isInvalid: false,
  isRequired: false,
  setInvalid: function (): void {
    throw new Error(FUNCTION_NOT_IMPLEMENTED);
  },
  realtimeValidation: {
    isInvalid: false,
    validationErrors: [],
    validationDetails: {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: false,
      valueMissing: false,
    },
  },
  displayValidation: {
    isInvalid: false,
    validationErrors: [],
    validationDetails: {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: false,
      valueMissing: false,
    },
  },
  updateValidation: function (): void {
    throw new Error(FUNCTION_NOT_IMPLEMENTED);
  },
  resetValidation: function (): void {
    throw new Error(FUNCTION_NOT_IMPLEMENTED);
  },
  commitValidation: function (): void {
    throw new Error(FUNCTION_NOT_IMPLEMENTED);
  },
  defaultValue: [],
});

export function SelectorCheckboxGroup(props: SelectorCheckboxGroupProps) {
  const { children, label, description, errorMessage } = props;
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } = useCheckboxGroup(props, state);

  return (
    <>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && state.isInvalid && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div {...groupProps} className={styles({ className: groupProps.className })}>
        <SelectorCheckboxGroupContext.Provider value={state}>{children}</SelectorCheckboxGroupContext.Provider>
      </div>
    </>
  );
}

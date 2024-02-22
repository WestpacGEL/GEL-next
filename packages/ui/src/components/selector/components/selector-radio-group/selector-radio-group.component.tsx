'use client';

import React, { createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { ErrorMessage, Hint, Label } from '../../../index.js';

import { styles } from './selector-radio-group.styles.js';
import { type SelectorRadioGroupContextState, type SelectorRadioGroupProps } from './selector-radio-group.types.js';

export const SelectorRadioGroupContext = createContext<SelectorRadioGroupContextState>({
  // TODO: Remove deprecated name prop once React Aria removes it from RadioGroupState
  name: '',
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  validationState: null,
  selectedValue: null,
  setSelectedValue: () => null,
  lastFocusedValue: null,
  setLastFocusedValue: () => null,
  orientation: 'vertical',
  isInvalid: false,
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
    throw new Error('Function not implemented.');
  },
  resetValidation: function (): void {
    throw new Error('Function not implemented.');
  },
  commitValidation: function (): void {
    throw new Error('Function not implemented.');
  },
});

export function SelectorRadioGroup({
  className,
  children,
  label,
  orientation = 'vertical',
  errorMessage,
  description,
  ...props
}: SelectorRadioGroupProps) {
  const state = useRadioGroupState({ ...props, errorMessage, label, orientation });
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } = useRadioGroup(
    { ...props, label, orientation },
    state,
  );

  return (
    <>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <div className={styles({ className, orientation })} {...radioGroupProps}>
        <SelectorRadioGroupContext.Provider value={{ ...state, orientation }}>
          {children}
        </SelectorRadioGroupContext.Provider>
      </div>
    </>
  );
}

'use client';

import React, { createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { ButtonGroupButton, ErrorMessage, Hint, Label } from '../index.js';

import { styles as buttonGroupStyles } from './button-group.styles.js';
import { ButtonGroupContextState, type ButtonGroupProps } from './button-group.types.js';

export const ButtonGroupContext = createContext<ButtonGroupContextState>({
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
  block: false,
  look: 'hero',
  size: 'medium',
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

export function ButtonGroup({
  className,
  buttons,
  label,
  look = 'hero',
  size = 'medium',
  block = false,
  errorMessage,
  hintMessage,
  ...props
}: ButtonGroupProps) {
  const state = useRadioGroupState({ ...props, label, orientation: 'horizontal' });
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } = useRadioGroup(
    {
      ...props,
      'aria-errormessage': Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      label,
      orientation: 'horizontal',
    },
    state,
  );
  const styles = buttonGroupStyles({});

  return (
    <div className={styles.base({ className })} {...radioGroupProps}>
      <Label {...labelProps}>{label}</Label>
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <div className={styles.buttonWrapper()}>
        <ButtonGroupContext.Provider value={{ ...state, size, look, block }}>
          {buttons.map((button, index) => (
            <ButtonGroupButton key={index} className="group/buttons" {...button} />
          ))}
        </ButtonGroupContext.Provider>
      </div>
    </div>
  );
}

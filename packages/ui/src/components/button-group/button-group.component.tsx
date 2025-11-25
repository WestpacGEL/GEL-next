'use client';

import React, { createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { FUNCTION_NOT_IMPLEMENTED } from '../../constants/message.js';
import { ButtonGroupButton, ErrorMessage, Hint, Label } from '../index.js';

import { styles as buttonGroupStyles } from './button-group.styles.js';
import { ButtonGroupContextState, type ButtonGroupProps } from './button-group.types.js';

export const ButtonGroupContext = createContext<ButtonGroupContextState>({
  block: false,
  look: 'hero',
  size: 'medium',
  state: {
    // TODO: Remove deprecated name prop once React Aria removes it from RadioGroupState
    name: '',
    defaultSelectedValue: null,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    validationState: null,
    selectedValue: null,
    setSelectedValue: () => null,
    lastFocusedValue: null,
    setLastFocusedValue: () => null,
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
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    resetValidation: function (): void {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    commitValidation: function (): void {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
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
      {label && <Label {...labelProps}>{label}</Label>}
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && state.isInvalid && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div className={styles.buttonWrapper()}>
        <ButtonGroupContext.Provider value={{ state, size, look, block }}>
          {buttons.map((button, index) => (
            <ButtonGroupButton key={index} className="group/buttons" {...button} />
          ))}
        </ButtonGroupContext.Provider>
      </div>
    </div>
  );
}

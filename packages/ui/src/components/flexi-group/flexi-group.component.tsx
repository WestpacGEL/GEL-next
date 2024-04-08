import React, { createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { RadioGroupState, useRadioGroupState } from 'react-stately';

import { FUNCTION_NOT_IMPLEMENTED } from '../../constants/message.js';
import { ErrorMessage } from '../error-message/index.js';
import { Hint } from '../hint/index.js';
import { Label } from '../label/index.js';

import { FlexiFieldComponent } from './components/FlexiField.component.js';
import { type FlexiGroupProps } from './flexi-group.types.js';

export const FlexiFieldContext = createContext<{ state: RadioGroupState }>({
  state: {
    name: '',
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

export function FlexiGroup({
  className,
  tag: Tag = 'div',
  flexiFields,
  label,
  errorMessage,
  hintMessage,
  pictogram,
  ...props
}: FlexiGroupProps) {
  const state = useRadioGroupState({ ...props, label, orientation: 'vertical' });
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } = useRadioGroup(
    {
      ...props,
      'aria-errormessage': Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      label,
      orientation: 'vertical',
    },
    state,
  );

  return (
    <Tag className={className} {...radioGroupProps}>
      <Label {...labelProps}>{label}</Label>
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && state.isInvalid && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <FlexiFieldContext.Provider value={{ state }}>
        {flexiFields.map((flexiItem, index) => (
          <FlexiFieldComponent key={index} pictogram={pictogram} {...flexiItem} />
        ))}
      </FlexiFieldContext.Provider>
    </Tag>
  );
}

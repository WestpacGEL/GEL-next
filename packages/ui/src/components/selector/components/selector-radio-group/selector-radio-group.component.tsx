'use client';

import React, { createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { ErrorMessage, Hint, Label } from '../../../index.js';

import { SelectorRadioGroupOption } from './components/index.js';
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
    <div className={styles({ className, orientation })} {...radioGroupProps}>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <SelectorRadioGroupContext.Provider value={{ ...state, orientation }}>
        {children}
      </SelectorRadioGroupContext.Provider>
    </div>
  );
}

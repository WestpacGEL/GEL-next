'use client';

import React, { ReactElement, cloneElement, createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { ErrorMessage, FormHint, FormLabel } from '../index.js';

import { styles as buttonGroupStyles } from './button-group.styles.js';
import { ButtonGroupContextState, type ButtonGroupProps } from './button-group.types.js';
import { Button } from './components/button/button.component.js';

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
});

export function ButtonGroup({
  className,
  children,
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
  const childrenToRender = children.map((child, index) => {
    return cloneElement(child as ReactElement, {
      key: index,
      className: 'group/buttons',
    });
  });

  return (
    <div className={styles.base({ className })} {...radioGroupProps}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      {hintMessage && <FormHint {...descriptionProps}>{hintMessage}</FormHint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <div className={styles.buttonWrapper()}>
        <ButtonGroupContext.Provider value={{ ...state, size, look, block }}>
          {childrenToRender}
        </ButtonGroupContext.Provider>
      </div>
    </div>
  );
}
ButtonGroup.Button = Button;

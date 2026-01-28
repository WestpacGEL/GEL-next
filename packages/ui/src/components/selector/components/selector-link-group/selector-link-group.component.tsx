'use client';

import React, { createContext } from 'react';
import { useField } from 'react-aria';

import { ErrorMessage, Hint, Label } from '../../../index.js';

import { styles } from './selector-link-group.styles.js';
import { SelectorLinkGroupProps } from './selector-link-group.types.js';

export const SelectorLinkContext = createContext<{ isDisabled?: boolean }>({
  isDisabled: undefined,
});

export function SelectorLinkGroup({
  className,
  children,
  label,
  orientation = 'vertical',
  errorMessage,
  description,
  isDisabled,
  ...props
}: SelectorLinkGroupProps) {
  const validationState = errorMessage ? 'invalid' : 'valid';
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    validationState: validationState,
    label,
    errorMessage,
    description,
    ...props,
  });

  const state: { isDisabled?: boolean } = { isDisabled };

  return (
    <>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div className={styles({ className, orientation })} {...fieldProps}>
        <SelectorLinkContext.Provider value={state}>{children}</SelectorLinkContext.Provider>
      </div>
    </>
  );
}

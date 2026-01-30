'use client';

import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useField } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { ErrorMessage, Hint, Label } from '../../../index.js';

import { styles } from './selector-button-group.styles.js';
import { SelectorButtonGroupContextState, SelectorButtonGroupProps } from './selector-button-group.types.js';

export const SelectorButtonContext = createContext<SelectorButtonGroupContextState>({
  value: '',
  onClick: () => undefined,
  validationState: 'valid',
  isDisabled: undefined,
});

export function SelectorButtonGroup({
  className,
  children,
  label,
  orientation = 'vertical',
  errorMessage,
  description,
  value = '',
  isDisabled,
  ...props
}: SelectorButtonGroupProps) {
  const [selected, setSelected] = useState(value);
  const breakpoint = useBreakpoint();
  const resolvedOrientation = resolveResponsiveVariant(orientation, breakpoint);

  const handleChange = useCallback(
    (id: string) => {
      setSelected(id);
    },
    [setSelected],
  );

  const state: SelectorButtonGroupContextState = useMemo(
    () => ({
      value: selected,
      onClick: (id: string) => handleChange(id),
      validationState: errorMessage ? 'invalid' : 'valid',
      isDisabled,
    }),
    [errorMessage, handleChange, isDisabled, selected],
  );

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    validationState: state.validationState,
    label,
    errorMessage,
    description,
    ...props,
  });

  return (
    <>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div className={styles({ className, orientation: resolvedOrientation })} {...fieldProps}>
        <SelectorButtonContext.Provider value={state}>{children}</SelectorButtonContext.Provider>
      </div>
    </>
  );
}

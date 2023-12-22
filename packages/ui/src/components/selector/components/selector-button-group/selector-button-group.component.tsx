import { createContext, useCallback, useState } from 'react';
import { useField } from 'react-aria';

import { ErrorMessage, FormHint, FormLabel } from '../../../index.js';

import { SelectorButtonGroupOption } from './components/index.js';
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

  const handleChange = useCallback(
    (id: string) => {
      setSelected(id);
    },
    [selected, setSelected],
  );

  const state: SelectorButtonGroupContextState = {
    value: selected,
    onClick: (id: string) => handleChange(id),
    validationState: errorMessage ? 'invalid' : 'valid',
    isDisabled,
  };

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    validationState: state.validationState,
    label,
    errorMessage,
    description,
    ...props,
  });

  return (
    <div className={styles({ className, orientation })} {...fieldProps}>
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}
      {description && <FormHint {...descriptionProps}>{description}</FormHint>}
      {errorMessage && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <SelectorButtonContext.Provider value={state}>{children}</SelectorButtonContext.Provider>
    </div>
  );
}
SelectorButtonGroup.Option = SelectorButtonGroupOption;

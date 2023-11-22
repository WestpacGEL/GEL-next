import React, { createContext } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { ErrorMessage, FormHint, FormLabel } from '../../../index.js';

import { SelectorCheckboxGroupOption } from './components/index.js';
import { styles } from './selector-checkbox-group.styles.js';
import {
  type SelectorCheckboxGroupContextState,
  type SelectorCheckboxGroupProps,
} from './selector-checkbox-group.types.js';

export const SelectorCheckboxGroupContext = createContext<SelectorCheckboxGroupContextState>({
  value: [],
  isDisabled: false,
  isReadOnly: false,
  isSelected: () => false,
  setValue: () => null,
  addValue: () => null,
  removeValue: () => null,
  toggleValue: () => null,
  validationState: 'valid',
});

export function SelectorCheckboxGroup(props: SelectorCheckboxGroupProps) {
  const { children, label, description, errorMessage } = props;
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } = useCheckboxGroup(props, state);

  return (
    <div {...groupProps} className={styles({ className: groupProps.className })}>
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}
      {description && <FormHint {...descriptionProps}>{description}</FormHint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <SelectorCheckboxGroupContext.Provider value={state}>{children}</SelectorCheckboxGroupContext.Provider>
    </div>
  );
}
SelectorCheckboxGroup.Option = SelectorCheckboxGroupOption;

import React, { createContext } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

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
      <span {...labelProps}>{label}</span>
      <SelectorCheckboxGroupContext.Provider value={state}>{children}</SelectorCheckboxGroupContext.Provider>
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {errorMessage && state.validationState === 'invalid' && (
        <div {...errorMessageProps} className="typography-body-10 text-danger">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
SelectorCheckboxGroup.Option = SelectorCheckboxGroupOption;

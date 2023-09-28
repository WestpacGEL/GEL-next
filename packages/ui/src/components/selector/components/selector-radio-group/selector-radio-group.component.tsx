import React, { createContext } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

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
  ...props
}: SelectorRadioGroupProps) {
  const state = useRadioGroupState({ ...props, errorMessage, label, orientation });
  const { radioGroupProps, labelProps, errorMessageProps } = useRadioGroup({ ...props, label, orientation }, state);

  return (
    <div className={styles({ className, orientation })} {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <SelectorRadioGroupContext.Provider value={{ ...state, orientation }}>
        {children}
      </SelectorRadioGroupContext.Provider>
      {errorMessage && state.validationState === 'invalid' && (
        <div {...errorMessageProps} className="typography-body-10 text-danger">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
SelectorRadioGroup.Option = SelectorRadioGroupOption;

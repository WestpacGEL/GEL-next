import React, { createContext, useState } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { Button } from '../button/index.js';
import { ExpandMoreIcon } from '../icon/index.js';

import { Option } from './components/option/option.component.js';
import { styles as radioStyles } from './radio.styles.js';
import { type RadioContextState, type RadioProps } from './radio.types.js';

export const RadioContext = createContext<RadioContextState>({
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
  size: 'medium',
});

export function Radio({
  className,
  children,
  data,
  label,
  orientation = 'vertical',
  showAmount = 0,
  size = 'medium',
  ...props
}: RadioProps) {
  const state = useRadioGroupState({ ...props, label, orientation });
  const { radioGroupProps, labelProps } = useRadioGroup({ ...props, label, orientation }, state);
  const [hiddenOptions, setHiddenOptions] = useState<boolean>(showAmount > 0);
  const revealAmount = data ? data.length - showAmount : children && children.length - showAmount;
  const styles = radioStyles({ orientation });
  const childrenToRender = data
    ? data.map((option, index) => (
        <Option value={option.value} isDisabled={option.isDisabled} hint={option.hint} key={index}>
          {option.text}
        </Option>
      ))
    : children?.map((child, index) => <div key={index}>{child}</div>);

  return (
    <div className={styles.base({ className })} {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <div className={styles.optionWrapper()}>
        <RadioContext.Provider value={{ ...state, orientation, size }}>
          {hiddenOptions ? childrenToRender?.slice(0, showAmount) : childrenToRender}
        </RadioContext.Provider>
        {hiddenOptions && (
          <Button onClick={() => setHiddenOptions(false)} className={styles.revealButton()} color="link">
            <p className={styles.buttonText()}>{`Show ${revealAmount} more ${
              revealAmount === 1 ? 'item' : 'items'
            }`}</p>
            <ExpandMoreIcon size="small" color="link" />
          </Button>
        )}
      </div>
    </div>
  );
}
Radio.Option = Option;

'use client';

import React, { ReactElement, cloneElement, createContext, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusRing, useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { Button } from '../button/index.js';
import { ExpandMoreIcon } from '../icon/index.js';
import { ErrorMessage, Hint, Label } from '../index.js';

import { styles as radioGroupStyles } from './radio-group.styles.js';
import { type RadioGroupContextState, type RadioGroupProps } from './radio-group.types.js';

export const RadioGroupContext = createContext<RadioGroupContextState>({
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
  size: 'medium',
});

export function RadioGroup({
  className,
  children,
  label,
  orientation = 'vertical',
  showAmount = 0,
  size = 'medium',
  errorMessage,
  hintMessage,
  ...props
}: RadioGroupProps) {
  const state = useRadioGroupState({ ...props, label, orientation });
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } = useRadioGroup(
    { ...props, label, orientation },
    state,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const [hiddenOptions, setHiddenOptions] = useState<boolean>(showAmount > 0);
  const firstNewRadioRef = useRef<HTMLDivElement>(null);
  const revealAmount = children && children.length - showAmount;
  const styles = radioGroupStyles({ orientation, isFocusVisible });
  const childrenToRender = useMemo(() => {
    const newChildren = children.map((child, index) => {
      return cloneElement(child as ReactElement, {
        key: index,
        ref: index === showAmount ? firstNewRadioRef : null,
      });
    });

    return hiddenOptions ? newChildren.slice(0, showAmount) : newChildren;
  }, [children, hiddenOptions, showAmount]);

  useEffect(() => {
    if (showAmount > 0 && !hiddenOptions) {
      firstNewRadioRef.current?.focus();
    }
  }, [hiddenOptions, showAmount]);

  return (
    <div className={styles.base({ className })} {...radioGroupProps}>
      <Label {...labelProps}>{label}</Label>
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <div className={styles.radioWrapper()}>
        <RadioGroupContext.Provider value={{ ...state, orientation, size }}>
          {childrenToRender}
        </RadioGroupContext.Provider>
        {hiddenOptions && (
          <Button
            onClick={() => setHiddenOptions(false)}
            className={styles.revealButton()}
            look="link"
            iconAfter={() => <ExpandMoreIcon size="small" color="link" />}
            {...focusProps}
          >
            <p className={styles.buttonText()}>{`Show ${revealAmount} more ${
              revealAmount === 1 ? 'item' : 'items'
            }`}</p>
          </Button>
        )}
      </div>
    </div>
  );
}

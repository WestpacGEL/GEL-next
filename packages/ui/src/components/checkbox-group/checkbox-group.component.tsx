'use client';

import React, { ReactElement, cloneElement, createContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCheckboxGroup, useFocusRing } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { Button } from '../button/index.js';
import { ExpandMoreIcon } from '../icon/index.js';
import { ErrorMessage, FormHint, FormLabel } from '../index.js';

import { styles as checkboxStyles } from './checkbox-group.styles.js';
import { type CheckboxGroupContextState, type CheckboxGroupProps } from './checkbox-group.types.js';
import { Checkbox } from './components/checkbox/checkbox.component.js';

export const CheckboxGroupContext = createContext<CheckboxGroupContextState>({
  orientation: 'vertical',
  size: 'medium',
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
export function CheckboxGroup({
  className,
  children,
  label,
  orientation = 'vertical',
  showAmount = 0,
  size = 'medium',
  errorMessage,
  hintMessage,
  ...props
}: CheckboxGroupProps) {
  const state = useCheckboxGroupState({ ...props, label });
  const { groupProps, labelProps, errorMessageProps, descriptionProps } = useCheckboxGroup({ ...props, label }, state);
  const { isFocusVisible, focusProps } = useFocusRing();
  const [hiddenOptions, setHiddenOptions] = useState<boolean>(showAmount > 0);
  const firstNewCheckboxRef = useRef<HTMLDivElement>(null);
  const revealAmount = children && children.length - showAmount;
  const styles = checkboxStyles({ orientation, isFocusVisible });
  const childrenToRender = useMemo(() => {
    const newChildren = children.map((child, index) => {
      return cloneElement(child as ReactElement, {
        key: index,
        ref: index === showAmount ? firstNewCheckboxRef : null,
      });
    });

    return hiddenOptions ? newChildren.slice(0, showAmount) : newChildren;
  }, [children, hiddenOptions, showAmount]);

  useEffect(() => {
    if (showAmount > 0 && !hiddenOptions) {
      firstNewCheckboxRef.current?.focus();
    }
  }, [hiddenOptions, showAmount]);

  return (
    <div className={styles.base({ className })} {...groupProps}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      {hintMessage && <FormHint {...descriptionProps}>{hintMessage}</FormHint>}
      {errorMessage && state.validationState === 'invalid' && (
        <ErrorMessage {...errorMessageProps} message={errorMessage} />
      )}
      <div className={styles.itemWrapper()}>
        <CheckboxGroupContext.Provider value={{ ...state, orientation, size }}>
          {childrenToRender}
        </CheckboxGroupContext.Provider>
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
CheckboxGroup.Checkbox = Checkbox;

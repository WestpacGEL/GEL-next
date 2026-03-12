'use client';

import React, { createContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useCheckboxGroup, useFocusRing } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { FUNCTION_NOT_IMPLEMENTED } from '../../constants/message.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Button } from '../button/index.js';
import { ExpandMoreIcon } from '../icon/index.js';
import { CheckboxGroupCheckbox, ErrorMessage, Hint, Label } from '../index.js';

import { styles as checkboxStyles } from './checkbox-group.styles.js';
import { type CheckboxGroupContextState, type CheckboxGroupProps } from './checkbox-group.types.js';

export const CheckboxGroupContext = createContext<CheckboxGroupContextState>({
  orientation: 'vertical',
  size: 'medium',
  state: {
    defaultValue: [],
    value: [],
    isDisabled: false,
    isReadOnly: false,
    isSelected: () => false,
    setValue: () => null,
    addValue: () => null,
    removeValue: () => null,
    toggleValue: () => null,
    validationState: 'valid',
    isInvalid: false,
    isRequired: false,
    setInvalid: () =>
      function (): void {
        throw new Error(FUNCTION_NOT_IMPLEMENTED);
      },
    realtimeValidation: {
      isInvalid: false,
      validationErrors: [],
      validationDetails: {
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: false,
        valueMissing: false,
      },
    },
    displayValidation: {
      isInvalid: false,
      validationErrors: [],
      validationDetails: {
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: false,
        valueMissing: false,
      },
    },
    updateValidation: function (): void {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    resetValidation: function (): void {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    commitValidation: function (): void {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  },
});
export function CheckboxGroup({
  className,
  checkboxes,
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
  const firstNewCheckboxRef = useRef<HTMLLabelElement>(null);
  const revealAmount = checkboxes && checkboxes.length - showAmount;
  const breakpoint = useBreakpoint();
  const styles = checkboxStyles({ orientation: resolveResponsiveVariant(orientation, breakpoint), isFocusVisible });
  const panelId = useId();
  const childrenToRender = useMemo(() => {
    const newChildren = checkboxes.map((checkbox, index) => (
      <CheckboxGroupCheckbox key={index} ref={index === showAmount ? firstNewCheckboxRef : null} {...checkbox} />
    ));

    return hiddenOptions ? newChildren.slice(0, showAmount) : newChildren;
  }, [checkboxes, hiddenOptions, showAmount]);

  useEffect(() => {
    if (showAmount > 0 && !hiddenOptions) {
      firstNewCheckboxRef.current?.focus();
    }
  }, [hiddenOptions, showAmount]);

  return (
    <div className={styles.base({ className })} {...groupProps}>
      <Label {...labelProps}>{label}</Label>
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && state.isInvalid && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div className={styles.itemWrapper()} id={panelId}>
        <CheckboxGroupContext.Provider
          value={{
            state,
            orientation: resolveResponsiveVariant(orientation, breakpoint) || 'vertical',
            size: resolveResponsiveVariant(size, breakpoint) || 'medium',
          }}
        >
          {childrenToRender}
        </CheckboxGroupContext.Provider>
        {hiddenOptions && (
          <Button
            onClick={() => setHiddenOptions(false)}
            className={styles.revealButton()}
            look="link"
            iconAfter={() => <ExpandMoreIcon size="small" color="primary" />}
            aria-controls={panelId}
            aria-expanded={!hiddenOptions}
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

'use client';

import React, { ForwardedRef, createContext, forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useFocusRing, useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { FUNCTION_NOT_IMPLEMENTED } from '../../constants/message.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { FocusHandle, acceptInputs, useFocusManagerRef } from '../../hook/focus-manager-ref.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Button } from '../button/index.js';
import { ExpandMoreIcon } from '../icon/index.js';
import { ErrorMessage, Hint, Label, RadioGroupRadio } from '../index.js';

import { styles as radioGroupStyles } from './radio-group.styles.js';
import { type RadioGroupContextState, type RadioGroupProps } from './radio-group.types.js';

export const RadioGroupContext = createContext<RadioGroupContextState>({
  orientation: 'vertical',
  size: 'medium',
  state: {
    name: '',
    defaultSelectedValue: null,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    validationState: null,
    selectedValue: null,
    setSelectedValue: () => null,
    lastFocusedValue: null,
    setLastFocusedValue: () => null,
    isInvalid: false,
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

function BaseRadioGroup(
  {
    className,
    radios,
    label,
    orientation = 'vertical',
    showAmount = 0,
    size = 'medium',
    errorMessage,
    hintMessage,
    ...props
  }: RadioGroupProps,
  // `ref.current.focus()` (e.g. react-hook-form focusing a field with a validation error) moves focus
  // to the group's tab stop: the selected radio, or the first enabled radio when nothing is selected.
  ref: ForwardedRef<FocusHandle>,
) {
  const wrapperRef = useFocusManagerRef(ref, { accept: acceptInputs });
  const breakpoint = useBreakpoint();
  const resolvedOrientation = resolveResponsiveVariant(orientation, breakpoint);
  const resolvedSize = resolveResponsiveVariant(size, breakpoint);
  const state = useRadioGroupState({ ...props, label, orientation: resolvedOrientation });
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } = useRadioGroup(
    { ...props, label, orientation: resolvedOrientation },
    state,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const [hiddenOptions, setHiddenOptions] = useState<boolean>(showAmount > 0);
  const firstNewRadioRef = useRef<HTMLInputElement>(null);
  const revealAmount = radios && radios.length - showAmount;
  const styles = radioGroupStyles({ orientation: resolvedOrientation, isFocusVisible });
  const panelId = useId();
  const childrenToRender = useMemo(() => {
    const newChildren = radios.map((radio, index) => (
      <RadioGroupRadio key={index} ref={index === showAmount ? firstNewRadioRef : null} {...radio} />
    ));

    return hiddenOptions ? newChildren.slice(0, showAmount) : newChildren;
  }, [radios, hiddenOptions, showAmount]);

  useEffect(() => {
    if (showAmount > 0 && !hiddenOptions) {
      firstNewRadioRef.current?.focus();
    }
  }, [hiddenOptions, showAmount]);

  return (
    <div className={styles.base({ className })} {...radioGroupProps}>
      <Label {...labelProps}>{label}</Label>
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && state.isInvalid && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div className={styles.radioWrapper()} id={panelId} ref={wrapperRef}>
        <RadioGroupContext.Provider value={{ state, orientation: resolvedOrientation, size: resolvedSize }}>
          {childrenToRender}
        </RadioGroupContext.Provider>
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

export const RadioGroup = forwardRef(BaseRadioGroup);
RadioGroup.displayName = 'RadioGroup';

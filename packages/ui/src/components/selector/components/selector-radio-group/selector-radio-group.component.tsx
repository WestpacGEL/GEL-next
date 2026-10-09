'use client';

import React, { ForwardedRef, createContext, forwardRef } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { FUNCTION_NOT_IMPLEMENTED } from '../../../../constants/message.js';
import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { FocusHandle, useFocusManagerRef } from '../../../../hook/focus-manager-ref.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { ErrorMessage, Hint, Label } from '../../../index.js';

import { styles } from './selector-radio-group.styles.js';
import { type SelectorRadioGroupContextState, type SelectorRadioGroupProps } from './selector-radio-group.types.js';

export const SelectorRadioGroupContext = createContext<SelectorRadioGroupContextState>({
  orientation: 'vertical',
  state: {
    // TODO: Remove deprecated name prop once React Aria removes it from RadioGroupState
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

function BaseSelectorRadioGroup(
  {
    className,
    children,
    label,
    orientation = 'vertical',
    errorMessage,
    description,
    ...props
  }: SelectorRadioGroupProps,
  // `ref.current.focus()` moves focus to the group's tab stop: the selected radio, or the first
  // enabled radio when nothing is selected.
  ref: ForwardedRef<FocusHandle>,
) {
  const wrapperRef = useFocusManagerRef(ref);
  const breakpoint = useBreakpoint();
  const resolvedOrientation = resolveResponsiveVariant(orientation, breakpoint);
  const state = useRadioGroupState({ ...props, errorMessage, label, orientation: resolvedOrientation });
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } = useRadioGroup(
    { ...props, label, orientation: resolvedOrientation },
    state,
  );

  return (
    <>
      {label && <Label {...labelProps}>{label}</Label>}
      {description && <Hint {...descriptionProps}>{description}</Hint>}
      {errorMessage && state.isInvalid && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      <div className={styles({ className, orientation: resolvedOrientation })} {...radioGroupProps} ref={wrapperRef}>
        <SelectorRadioGroupContext.Provider value={{ state, orientation: resolvedOrientation }}>
          {children}
        </SelectorRadioGroupContext.Provider>
      </div>
    </>
  );
}

export const SelectorRadioGroup = forwardRef(BaseSelectorRadioGroup);
SelectorRadioGroup.displayName = 'SelectorRadioGroup';

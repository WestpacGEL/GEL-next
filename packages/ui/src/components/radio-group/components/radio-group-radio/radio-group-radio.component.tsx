'use client';

import React, { ForwardedRef, forwardRef, useContext } from 'react';
import { VisuallyHidden, mergeProps, useFocusRing, useObjectRef, useRadio } from 'react-aria';

import { RadioGroupContext } from '../../radio-group.component.js';

import { styles as radioStyles } from './radio-group-radio.styles.js';
import { type RadioGroupRadioProps } from './radio-group-radio.types.js';

function BaseRadioGroupRadio(
  { className, hint, label, ...props }: RadioGroupRadioProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { state, size, orientation } = useContext(RadioGroupContext);
  const inputRef = useObjectRef(ref);
  const { inputProps, labelProps, isSelected, isDisabled } = useRadio({ ...props, children: label }, state, inputRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = radioStyles({ isDisabled, isSelected, isFocusVisible, size, orientation });

  return (
    <label className={styles.base({ className })} {...labelProps}>
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} ref={inputRef} />
      </VisuallyHidden>
      <span className={styles.selector()} />
      <span className={styles.textWrapper()}>
        <span className={styles.labelText()}>{label}</span>
        {hint && <span className={styles.hintText()}>{hint}</span>}
      </span>
    </label>
  );
}

export const RadioGroupRadio = forwardRef(BaseRadioGroupRadio);
RadioGroupRadio.displayName = 'RadioGroupRadio';

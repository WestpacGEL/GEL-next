'use client';

import React, { Ref, forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { RadioGroupContext } from '../../radio-group.component.js';

import { styles as radioStyles } from './radio-group-radio.styles.js';
import { type RadioGroupRadioProps } from './radio-group-radio.types.js';

function BaseRadioGroupRadio({ className, hint, label, ...props }: RadioGroupRadioProps, ref: Ref<HTMLLabelElement>) {
  const { state, size, orientation } = useContext(RadioGroupContext);
  const localRef = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, children: label }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = radioStyles({ isDisabled, isSelected, isFocusVisible, size, orientation });

  return (
    <label className={styles.base({ className })} ref={ref}>
      <VisuallyHidden elementType="span">
        <input {...inputProps} {...focusProps} ref={localRef} />
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

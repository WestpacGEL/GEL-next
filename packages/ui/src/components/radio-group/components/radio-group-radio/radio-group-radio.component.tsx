'use client';

import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { RadioGroupContext } from '../../radio-group.component.js';

import { styles as radioStyles } from './radio-group-radio.styles.js';
import { type RadioGroupRadioProps } from './radio-group-radio.types.js';

function BaseRadioGroupRadio({ className, hint, label, ...props }: RadioGroupRadioProps, ref: any) {
  const { state, size, orientation } = useContext(RadioGroupContext);
  const localRef = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, children: label }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = radioStyles({ isDisabled, isSelected, isFocusVisible, size, orientation });

  return (
    <label className={styles.base({ className })} ref={ref}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={localRef} />
      </VisuallyHidden>
      <div className={styles.selector()} />
      <div className={styles.textWrapper()}>
        <span className={styles.labelText()}>{label}</span>
        {hint && <span className={styles.hintText()}>{hint}</span>}
      </div>
    </label>
  );
}

export const RadioGroupRadio = forwardRef(BaseRadioGroupRadio);
RadioGroupRadio.displayName = 'RadioGroupRadio';

'use client';

import React, { useId, useRef } from 'react';
import { VisuallyHidden, mergeProps, useCheckbox, useFocusRing } from 'react-aria';
import { useToggleState } from 'react-stately';

import { styles as switchStyles } from './switch.styles.js';
import { type SwitchProps } from './switch.types.js';

export function Switch({
  className,
  label,
  size = 'medium',
  block = false,
  checked = false,
  isDisabled,
  ...props
}: SwitchProps) {
  const state = useToggleState({ ...props, defaultSelected: checked });
  const labelId = useId();
  const ref = useRef(null);
  const { isSelected } = state;
  const { inputProps, labelProps } = useCheckbox(
    { isDisabled, 'aria-labelledby': labelId, defaultSelected: checked, ...props },
    state,
    ref,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = switchStyles({ block, isFocusVisible, isSelected, isDisabled, size });

  return (
    <label className={styles.base({ className })} {...labelProps}>
      <span className={styles.label()} id={labelId}>
        {label}
      </span>
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <span className={styles.switchDiv()} />
    </label>
  );
}

import React, { useId, useRef } from 'react';
import { VisuallyHidden, useCheckbox, useFocusRing } from 'react-aria';
import { useToggleState } from 'react-stately';

import { styles as switchStyles } from './switch.styles.js';
import { type SwitchProps } from './switch.types.js';

export function Switch({ className, label, size = 'medium', block = false, isDisabled, ...props }: SwitchProps) {
  const state = useToggleState(props);
  const labelId = useId();
  const ref = useRef(null);
  const { inputProps } = useCheckbox({ isDisabled, 'aria-labelledby': labelId, ...props }, state, ref);
  const { isSelected } = state;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = switchStyles({ block, isFocusVisible, isSelected, isDisabled, size });

  return (
    <label className={styles.base({ className })}>
      <span className={styles.label()} id={labelId}>
        {label}
      </span>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div className={styles.switchDiv()} />
    </label>
  );
}

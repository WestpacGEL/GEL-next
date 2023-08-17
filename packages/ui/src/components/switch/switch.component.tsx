import React, { useRef } from 'react';
import { VisuallyHidden, useFocusRing, useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';

import { styles as switchStyles } from './switch.styles.js';
import { type SwitchProps } from './switch.types.js';

export function Switch({ className, label, size = 'medium', block = false, isDisabled, ...props }: SwitchProps) {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useSwitch({ isDisabled, 'aria-labelledby': 'label', ...props }, state, ref);
  const { isSelected } = state;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = switchStyles({ block, isFocusVisible, isSelected, isDisabled, size });

  return (
    <label className={styles.base({ className })}>
      <span className={styles.label()} id="label">
        {label}
      </span>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div className={styles.switch()} />
    </label>
  );
}

import React, { useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { RadioContext } from '../../radio.component.js';

import { styles as optionStyles } from './option.styles.js';
import { type OptionProps } from './option.types.js';

export function Option({ className, hint, children, value, ...props }: OptionProps) {
  const state = useContext(RadioContext);
  const { size, orientation } = state;
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, value, children }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = optionStyles({ isDisabled, size, orientation });
  const circleSize = size === 'large' ? 15 : 12;

  return (
    <label className={styles.base({ className })}>
      <VisuallyHidden>
        <input className={styles.hiddenInput()} {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg aria-hidden="true" className={styles.svg()}>
        <circle cx={circleSize} cy={circleSize} r={circleSize} className={styles.outerCircle()} />
        {isSelected && <circle cx={circleSize} cy={circleSize} r={circleSize / 2} className={styles.innerCircle()} />}
        {isFocusVisible && (
          <circle
            cx={circleSize}
            cy={circleSize}
            r={circleSize + 3}
            className={styles.focusRing()}
            data-testid="focus-ring"
          />
        )}
      </svg>
      <div className={styles.textWrapper()}>
        <span className={styles.labelText()}>{children}</span>
        {hint && <span className={styles.hintText()}>{hint}</span>}
      </div>
    </label>
  );
}

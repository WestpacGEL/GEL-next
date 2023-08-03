import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { RadioGroupContext } from '../../radio-group.component.js';

import {
  focusRingRadiusOffset,
  innerCircleDivisor,
  largeOuterCircleSize,
  smallOuterCircleSize,
} from './constants/radio.js';
import { styles as radioStyles } from './radio.styles.js';
import { type RadioProps } from './radio.types.js';

function BaseRadio({ className, hint, children, ...props }: RadioProps, ref: any) {
  const state = useContext(RadioGroupContext);
  const { size, orientation } = state;
  const localRef = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, children }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = radioStyles({ isDisabled, size, orientation });
  const outerCircleSize = size === 'large' ? largeOuterCircleSize : smallOuterCircleSize;

  return (
    <label className={styles.base({ className })} ref={ref}>
      <VisuallyHidden>
        <input className={styles.hiddenInput()} {...inputProps} {...focusProps} ref={localRef} />
      </VisuallyHidden>
      <svg aria-hidden="true" className={styles.svg()}>
        <circle cx={outerCircleSize} cy={outerCircleSize} r={outerCircleSize} className={styles.outerCircle()} />
        {isSelected && (
          <circle
            cx={outerCircleSize}
            cy={outerCircleSize}
            r={outerCircleSize / innerCircleDivisor}
            className={styles.innerCircle()}
          />
        )}
        {isFocusVisible && (
          <circle
            cx={outerCircleSize}
            cy={outerCircleSize}
            r={outerCircleSize + focusRingRadiusOffset}
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

export const Radio = forwardRef(BaseRadio);

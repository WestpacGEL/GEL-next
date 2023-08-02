import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, useCheckboxGroupItem, useFocusRing } from 'react-aria';

import { CheckboxContext } from '../../checkbox.component.js';

import { styles as checkboxItemStyles } from './checkbox-item.styles.js';
import { type CheckboxItemProps } from './checkbox-item.types.js';

function BaseCheckboxItem({ className, hint, children, value, ...props }: CheckboxItemProps, ref: any) {
  const state = useContext(CheckboxContext);
  const { size, orientation } = state;
  const localRef = useRef(null);
  const { inputProps, isDisabled, isSelected } = useCheckboxGroupItem({ ...props, value, children }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = checkboxItemStyles({ isDisabled, size, orientation });
  const rectSize = size === 'large' ? 30 : 24;
  const checkIcon =
    size === 'large'
      ? 'M20.3562 7.50038L13.4613 17.2566L8.67 13.7716L6.25 17.0579L14.4075 23.1579L23.75 10.0066L20.3562 7.50038Z'
      : 'M16.285 6.0003L10.769 13.8053L6.936 11.0173L5 13.6463L11.526 18.5263L19 8.0053L16.285 6.0003Z';

  return (
    <label className={styles.base({ className })} ref={ref}>
      <VisuallyHidden>
        <input className={styles.hiddenInput()} {...inputProps} {...focusProps} ref={localRef} />
      </VisuallyHidden>
      <svg width={rectSize} height={rectSize} aria-hidden="true" className={styles.svg()}>
        <rect x="0.5" y="0.5" rx="2.5" width={rectSize - 1} height={rectSize - 1} className={styles.boxRect()} />
        {isSelected && <path d={checkIcon} className={styles.innerCheck()} />}
        {isFocusVisible && (
          <rect
            x="-3"
            y="-3"
            rx="5"
            width={rectSize + 6}
            height={rectSize + 6}
            className={styles.focusRect()}
            data-testid="focus-rect"
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

export const CheckboxItem = forwardRef(BaseCheckboxItem);

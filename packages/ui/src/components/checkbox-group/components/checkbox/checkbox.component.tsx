import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, useCheckboxGroupItem, useFocusRing } from 'react-aria';

import { IconProps } from 'src/index.js';

import { Icon } from '../../../icon/icon.component.js';
import { CheckboxGroupContext } from '../../checkbox-group.component.js';

import { styles as checkboxItemStyles } from './checkbox.styles.js';
import { type CheckboxProps } from './checkbox.types.js';
import { focusRingOffset, largeSVGSize, rectSubtractor, smallSVGSize } from './constants/checkbox.js';

// TODO: Discuss with designers if this icon should be included as part of Icons
function CheckIcon({ 'aria-label': ariaLabel = 'Check', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M16.285 6.0003L10.769 13.8053L6.936 11.0173L5 13.6463L11.526 18.5263L19 8.0053L16.285 6.0003Z"
        fill="currentColor"
      />
    </Icon>
  );
}

function BaseCheckbox({ className, hint, children, value, ...props }: CheckboxProps, ref: any) {
  const state = useContext(CheckboxGroupContext);
  const { size, orientation } = state;
  const localRef = useRef(null);
  const { inputProps, isDisabled, isSelected } = useCheckboxGroupItem({ ...props, value, children }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = checkboxItemStyles({ isDisabled, size, orientation });
  const svgSize = size === 'large' ? largeSVGSize : smallSVGSize;
  const rectSize = svgSize - rectSubtractor;

  return (
    <label className={styles.base({ className })} ref={ref}>
      <VisuallyHidden>
        <input className={styles.hiddenInput()} {...inputProps} {...focusProps} ref={localRef} />
      </VisuallyHidden>
      <svg aria-hidden="true" className={styles.svg()}>
        <rect x="0.5" y="0.5" rx="2.5" width={rectSize} height={rectSize} className={styles.boxRect()} />
        {isSelected && <CheckIcon color={isDisabled ? 'border' : 'hero'} />}
        {isFocusVisible && (
          <rect
            x="-3"
            y="-3"
            rx="5"
            width={svgSize + focusRingOffset}
            height={svgSize + focusRingOffset}
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

export const Checkbox = forwardRef(BaseCheckbox);

import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, useCheckboxGroupItem, useFocusRing } from 'react-aria';

import { Icon } from '../../../icon/icon.component.js';
import { IconProps } from '../../../icon/index.js';
import { CheckboxGroupContext } from '../../checkbox-group.component.js';

import { styles as checkboxItemStyles } from './checkbox.styles.js';
import { type CheckboxProps } from './checkbox.types.js';

// TODO: Discuss with designers if this icon should be included as part of Icons
function CheckIcon({ copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon copyrightYear={copyrightYear} {...props}>
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
  const { isFocused, focusProps } = useFocusRing();
  const styles = checkboxItemStyles({ isDisabled, size, orientation, isFocused });

  return (
    <label className={styles.base({ className })} ref={ref}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={localRef} />
      </VisuallyHidden>
      <div className={styles.checkbox()}>
        {isSelected && <CheckIcon className={styles.checkIcon()} color={isDisabled ? 'border' : 'hero'} />}
      </div>
      <div className={styles.textWrapper()}>
        <span className={styles.labelText()}>{children}</span>
        {hint && <span className={styles.hintText()}>{hint}</span>}
      </div>
    </label>
  );
}

export const Checkbox = forwardRef(BaseCheckbox);

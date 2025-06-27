'use client';

import React, { Ref, forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, mergeProps, useCheckboxGroupItem, useFocusRing } from 'react-aria';

import { Icon } from '../../../icon/icon.component.js';
import { IconProps } from '../../../icon/index.js';
import { CheckboxGroupContext } from '../../checkbox-group.component.js';

import { styles as checkboxItemStyles } from './checkbox-group-checkbox.styles.js';
import { type CheckboxGroupCheckboxProps } from './checkbox-group-checkbox.types.js';

// TODO: Discuss with designers if this icon should be included as part of Icons
// Icon based on SVGs/instructions received from this issue https://github.com/WestpacGEL/GEL-next/issues/159
function CheckIcon({ copyrightYear = '2025', size, ...props }: IconProps) {
  const viewBoxSize = size === 'large' ? '0 0 30 30' : '0 0 24 24';
  return (
    <Icon copyrightYear={copyrightYear} viewBox={viewBoxSize} {...props}>
      {size === 'large' ? (
        <path
          d="M12.9952 17.5891L20.2923 10.292L21.7023 11.712L12.9952 20.4191L8.28809 15.712L9.69809 14.302L12.9952 17.5891Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M9.99519 14.5891L17.2923 7.29199L18.7023 8.71199L9.99519 17.4191L5.28809 12.712L6.69809 11.302L9.99519 14.5891Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

function BaseCheckbox(
  { className, hint, label, value, ...props }: CheckboxGroupCheckboxProps,
  ref: Ref<HTMLLabelElement>,
) {
  const { state, size, orientation } = useContext(CheckboxGroupContext);
  const localRef = useRef(null);
  const { inputProps, labelProps, isDisabled, isSelected } = useCheckboxGroupItem(
    { ...props, value, children: label },
    state,
    localRef,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = checkboxItemStyles({ isDisabled, size, orientation, isFocusVisible });

  return (
    <label className={styles.base({ className })} ref={ref} {...labelProps}>
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} ref={localRef} />
      </VisuallyHidden>
      <span className={styles.checkbox()}>
        {isSelected && <CheckIcon className={styles.checkIcon()} size={size} color={isDisabled ? 'border' : 'hero'} />}
      </span>
      <span className={styles.textWrapper()}>
        <span className={styles.labelText()}>{label}</span>
        {hint && <span className={styles.hintText()}>{hint}</span>}
      </span>
    </label>
  );
}

export const CheckboxGroupCheckbox = forwardRef(BaseCheckbox);

'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './input.styles.js';
import { type InputProps } from './input.types.js';

export function BaseInput(
  { className, size = 'medium', invalid = false, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { isFocusVisible, isFocused, focusProps } = useFocusRing();
  return (
    <input
      ref={ref}
      className={styles({ className, size, invalid, isFocusVisible, isFocused })}
      aria-invalid={invalid}
      {...mergeProps(props, focusProps)}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(BaseInput);

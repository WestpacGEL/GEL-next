'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './input.styles.js';
import { type InputProps } from './input.types.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';

export function BaseInput(
  { className, size = 'medium', invalid = false, width = 'full', ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const breakpoint = useBreakpoint();
  const { isFocusVisible, focusProps } = useFocusRing();
  return (
    <input
      ref={ref}
      className={styles({
        className,
        size: resolveResponsiveVariant(size, breakpoint),
        invalid,
        isFocusVisible,
        width: resolveResponsiveVariant(width, breakpoint),
      })}
      aria-invalid={invalid}
      {...mergeProps(props, focusProps)}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(BaseInput);

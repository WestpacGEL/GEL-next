'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './textarea.styles.js';
import { type TextareaProps } from './textarea.types.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';

function BaseTextarea(
  { className, size = 'medium', invalid = false, width = 'full', ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const breakpoint = useBreakpoint();
  return (
    <textarea
      ref={ref}
      className={styles({
        className,
        size: resolveResponsiveVariant(size, breakpoint),
        invalid,
        isFocused,
        isFocusVisible,
        width: resolveResponsiveVariant(width, breakpoint),
      })}
      {...mergeProps(props, focusProps)}
    />
  );
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(BaseTextarea);

'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './textarea.styles.js';
import { type TextareaProps } from './textarea.types.js';

function BaseTextarea(
  { className, size = 'medium', invalid = false, width = 'full', ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  return (
    <textarea
      ref={ref}
      className={styles({ className, size, invalid, isFocused, isFocusVisible, width })}
      {...mergeProps(props, focusProps)}
    />
  );
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(BaseTextarea);

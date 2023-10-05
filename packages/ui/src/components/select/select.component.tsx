import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './select.styles.js';
import { type SelectProps } from './select.types.js';

function BaseSelect(
  { className, size = 'medium', invalid = false, children, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { isFocused, focusProps } = useFocusRing();
  return (
    <select ref={ref} className={styles({ className, size, invalid, isFocused })} {...mergeProps(props, focusProps)}>
      {children}
    </select>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);

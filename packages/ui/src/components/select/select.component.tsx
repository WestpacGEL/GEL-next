import React, { ForwardedRef, forwardRef } from 'react';

import { styles } from './select.styles.js';
import { type SelectProps } from './select.types.js';

function BaseSelect(
  { className, size = 'medium', invalid = false, children, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  return (
    <select ref={ref} className={styles({ className, size, invalid })} {...props}>
      {children}
    </select>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);

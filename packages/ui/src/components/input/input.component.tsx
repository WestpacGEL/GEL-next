import React, { forwardRef } from 'react';

import { styles } from './input.styles.js';
import { type InputProps } from './input.types.js';

export function BaseInput({ className, size = 'medium', invalid = false, ...props }: InputProps, ref: any) {
  return <input ref={ref} className={styles({ className, size, invalid })} {...props} />;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(BaseInput);

import React, { forwardRef } from 'react';

import { styles } from './button.styles.js';
import { type ButtonProps } from './button.types.js';

function BaseButton(
  { size = 'medium', soft = false, color = 'hero', className, tag: Tag = 'button', children, ...props }: ButtonProps,
  ref: any,
) {
  return (
    <Tag ref={ref} className={styles({ size, soft, color, className })} {...props}>
      {children}
    </Tag>
  );
}

export const Button = forwardRef(BaseButton);

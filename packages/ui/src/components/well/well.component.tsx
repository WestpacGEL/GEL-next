import React from 'react';

import { styles } from './well.styles.js';
import { type WellProps } from './well.types.js';

export function Well({ tag: Tag = 'div', color = 'light', children, className, ...props }: WellProps) {
  return (
    <Tag className={styles({ color, className })} {...props}>
      {children}
    </Tag>
  );
}

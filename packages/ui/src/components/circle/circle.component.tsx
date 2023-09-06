import React from 'react';

import { styles } from './circle.styles.js';
import { type CircleProps } from './circle.types.js';

export function Circle({ className, tag: Tag = 'div', children, ...props }: CircleProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}

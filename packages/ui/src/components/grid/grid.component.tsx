import React from 'react';

import { styles } from './grid.styles.js';
import { type GridProps } from './grid.types.js';

export function Grid({ className, tag: Tag = 'div', children, ...props }: GridProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}

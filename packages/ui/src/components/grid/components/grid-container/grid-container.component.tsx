import React from 'react';

import { styles } from './grid-container.styles.js';
import { type GridContainerProps } from './grid-container.types.js';

export function GridContainer({ className, tag: Tag = 'div', fixed = false, children, ...props }: GridContainerProps) {
  return (
    <Tag className={styles({ fixed, className })} {...props}>
      {children}
    </Tag>
  );
}

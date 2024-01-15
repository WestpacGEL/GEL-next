import React from 'react';

import { styles } from './grid-item.styles.js';
import { type GridItemProps } from './grid-item.types.js';

export function GridItem({ className, tag: Tag = 'div', span, rowSpan, start, children, ...props }: GridItemProps) {
  return (
    <Tag className={styles({ span, rowSpan, start, className })} {...props}>
      {children}
    </Tag>
  );
}

import React from 'react';

import { styles } from './item.styles.js';
import { type ItemProps } from './item.types.js';

export function Item({ className, tag: Tag = 'div', span, rowSpan, start, children, ...props }: ItemProps) {
  return (
    <Tag className={styles({ span, rowSpan, start, className })} {...props}>
      {children}
    </Tag>
  );
}

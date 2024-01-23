import React from 'react';

import { styles } from './hint.styles.js';
import { type HintProps } from './hint.types.js';

export function Hint({ className, tag: Tag = 'div', children, spacing, ...props }: HintProps) {
  return (
    <Tag className={styles({ className, spacing: spacing || 'medium' })} {...props}>
      {children}
    </Tag>
  );
}

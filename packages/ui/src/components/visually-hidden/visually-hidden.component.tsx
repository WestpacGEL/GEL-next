import React from 'react';

import { styles } from './visually-hidden.styles.js';
import { type VisuallyHiddenProps } from './visually-hidden.types.js';

export function VisuallyHidden({ className, tag: Tag = 'div', children, ...props }: VisuallyHiddenProps) {
  return (
    <Tag
      className={styles({
        className,
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

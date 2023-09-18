import React from 'react';

import { styles } from './form-hint.styles.js';
import { type FormHintProps } from './form-hint.types.js';

export function FormHint({ className, tag: Tag = 'div', children, ...props }: FormHintProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}

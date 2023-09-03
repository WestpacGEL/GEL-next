import React from 'react';

import { styles } from './container.styles.js';
import { type ContainerProps } from './container.types.js';

export function Container({ className, tag: Tag = 'div', fixed, children, ...props }: ContainerProps) {
  return (
    <Tag className={styles({ fixed, className })} {...props}>
      {children}
    </Tag>
  );
}

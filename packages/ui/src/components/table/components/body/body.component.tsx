import React from 'react';

import { styles } from './body.styles.js';
import { type BodyProps } from './body.types.js';

export function Body({ className, children, ...props }: BodyProps) {
  return (
    <tbody className={styles({ className })} {...props}>
      {children}
    </tbody>
  );
}

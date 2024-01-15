import React from 'react';

import { styles } from './table-body.styles.js';
import { type TableBodyBodyProps } from './table-body.types.js';

export function TableBody({ className, children, ...props }: TableBodyBodyProps) {
  return (
    <tbody className={styles({ className })} {...props}>
      {children}
    </tbody>
  );
}

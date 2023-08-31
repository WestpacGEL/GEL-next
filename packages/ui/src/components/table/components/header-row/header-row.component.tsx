import React from 'react';

import { styles } from './header-row.styles.js';
import { type HeaderRowProps } from './header-row.types.js';

export function HeaderRow({ className, children, ...props }: HeaderRowProps) {
  return (
    <tr className={styles({ className })} {...props}>
      {children}
    </tr>
  );
}

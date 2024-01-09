import React from 'react';

import { styles } from './table-header.styles.js';
import { type TableHeaderProps } from './table-header.types.js';

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={styles({ className })} {...props}>
      {children}
    </thead>
  );
}

import React from 'react';

import { styles } from './table-header-row.styles.js';
import { type TableHeaderRowProps } from './table-header-row.types.js';

export function TableHeaderRow({ className, children, ...props }: TableHeaderRowProps) {
  return <tr {...props}>{children}</tr>;
}

import React from 'react';

import { type TableHeaderRowProps } from './table-header-row.types.js';

export function TableHeaderRow({ className, children, ...props }: TableHeaderRowProps) {
  return <tr {...props}>{children}</tr>;
}

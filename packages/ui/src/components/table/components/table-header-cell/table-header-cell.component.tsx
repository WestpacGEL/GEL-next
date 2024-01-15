import React, { useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as headerCellStyles } from './table-header-cell.styles.js';
import { type TableHeaderCellProps } from './table-header-cell.types.js';

export function TableHeaderCell({ className, children, ...props }: TableHeaderCellProps) {
  const { bordered } = useContext(TableContext);
  const styles = headerCellStyles({ bordered });
  return (
    <th className={styles.base({ className })} {...props}>
      {children}
    </th>
  );
}

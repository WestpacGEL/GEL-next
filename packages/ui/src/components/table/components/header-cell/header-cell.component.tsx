import React, { useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as headerCellStyles } from './header-cell.styles.js';
import { type HeaderCellProps } from './header-cell.types.js';

export function HeaderCell({ className, children, ...props }: HeaderCellProps) {
  const { bordered } = useContext(TableContext);
  const styles = headerCellStyles({ bordered });
  return (
    <th className={styles.base({ className })} {...props}>
      {children}
    </th>
  );
}

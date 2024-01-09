import React, { useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as cellStyles } from './table-cell.styles.js';
import { type TableCellProps } from './table-cell.types.js';

export function TableCell({ className, children, highlighted, highlightStart, ...props }: TableCellProps) {
  const { bordered } = useContext(TableContext);
  const styles = cellStyles({ bordered, highlighted, highlightStart });
  return (
    <td className={styles.base({ className })} {...props}>
      {children}
    </td>
  );
}

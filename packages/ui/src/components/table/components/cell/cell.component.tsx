import React, { useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as cellStyles } from './cell.styles.js';
import { type CellProps } from './cell.types.js';

export function Cell({ className, children, highlighted, highlightStart, ...props }: CellProps) {
  const { bordered } = useContext(TableContext);
  const styles = cellStyles({ bordered, highlighted, highlightStart });
  return (
    <td className={styles.base({ className })} {...props}>
      {children}
    </td>
  );
}

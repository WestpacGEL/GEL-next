import { flexRender } from '@tanstack/react-table';
import { useContext } from 'react';

import { AdvancedTableContext } from '../../advanced-table.component.js';
import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';

import { styles as AdvancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell }: AdvancedTableCellProps<T>) {
  const { scrollableRows } = useContext(AdvancedTableContext);

  const styles = AdvancedTableCellStyles({ scrollableRows });

  return (
    <td
      key={cell.id}
      className={styles.td()}
      style={{ width: cell.column.getSize(), ...getCommonPinningStyles(cell.column) }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}

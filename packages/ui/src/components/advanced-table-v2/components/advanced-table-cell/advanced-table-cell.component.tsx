import { flexRender } from '@tanstack/react-table';

import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as advancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell }: AdvancedTableCellProps<T>) {
  const { padding, bordered } = useAdvancedTableContext<T>();
  const styles = advancedTableCellStyles({ padding, bordered });

  return (
    <td className={styles.td()}>
      <div className={styles.cellContent()}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
    </td>
  );
}

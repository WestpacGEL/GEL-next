import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as advancedTableGroupRowStyles } from './advanced-table-group-row.styles.js';
import { AdvancedTableGroupRowProps } from './advanced-table-group-row.types.js';

/** Renders a group-header row as a single full-width banner cell, spanning
 * every visible column so the row keeps valid table semantics.
 * TODO: Update this when ticket 9 is completed. */
export function AdvancedTableGroupRow<T>({ row }: AdvancedTableGroupRowProps<T>) {
  const { table } = useAdvancedTableContext<T>();
  const styles = advancedTableGroupRowStyles();
  const leafColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);
  const header = table.getColumn(row.groupingColumnId ?? '')?.columnDef.header;
  const columnName = typeof header === 'string' ? header : row.groupingColumnId;

  return (
    <tr className={styles.row()}>
      <td colSpan={leafColumnCount} className={styles.cell()}>
        {columnName}: {String(row.groupingValue)} ({row.subRows.length} {row.subRows.length === 1 ? 'row' : 'rows'})
      </td>
    </tr>
  );
}

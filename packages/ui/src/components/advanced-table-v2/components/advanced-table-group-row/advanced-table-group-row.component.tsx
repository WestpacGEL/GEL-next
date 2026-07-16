import { DropDownIcon, DropLeftIcon } from '../../../icon/index.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { getExpandButtonA11yProps } from '../../utils/index.js';

import { styles as advancedTableGroupRowStyles } from './advanced-table-group-row.styles.js';
import { AdvancedTableGroupRowProps } from './advanced-table-group-row.types.js';

/** Renders a group-header row as a full-width banner with an expand/collapse toggle. */
export function AdvancedTableGroupRow<T>({ row }: AdvancedTableGroupRowProps<T>) {
  const { table, tableId } = useAdvancedTableContext<T>();
  const styles = advancedTableGroupRowStyles();
  const leafColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);
  const header = table.getColumn(row.groupingColumnId ?? '')?.columnDef.header;
  const columnName = typeof header === 'string' ? header : row.groupingColumnId;
  // No single column value here, so the a11y label is the group text itself.
  const groupLabel = `${columnName}: ${String(row.groupingValue)}`;

  return (
    <tr className={styles.row()}>
      <td colSpan={leafColumnCount} className={styles.cell()}>
        <span className={styles.expandButton()}>
          <button
            className={styles.expandButtonInner()}
            onClick={row.getToggleExpandedHandler()}
            type="button"
            {...getExpandButtonA11yProps(tableId, row, groupLabel, false)}
          >
            {row.getIsExpanded() ? (
              <DropDownIcon aria-hidden size="small" />
            ) : (
              <DropLeftIcon aria-hidden size="small" />
            )}
          </button>
        </span>
        {columnName}: {String(row.groupingValue)} ({row.subRows.length} {row.subRows.length === 1 ? 'row' : 'rows'})
      </td>
    </tr>
  );
}

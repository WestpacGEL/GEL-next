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
  // Grouped rows don't have a column to reference, the a11y label is the group text itself.
  const groupLabel = `${columnName}: ${String(row.groupingValue)}`;

  // Remove pinned rows out of the count toward the displayed total
  const visibleMemberCount = row.subRows.filter(subRow => !subRow.getIsPinned()).length;
  // A group whose every member is pinned away can have nothing left to show.
  if (visibleMemberCount === 0) return null;

  return (
    <tr className={styles.row()}>
      <td className={styles.cell()} colSpan={leafColumnCount}>
        <div className={styles.cellContent()}>
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
          {columnName}: {String(row.groupingValue)} ({visibleMemberCount} {visibleMemberCount === 1 ? 'row' : 'rows'})
        </div>
      </td>
    </tr>
  );
}

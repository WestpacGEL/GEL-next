import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { AdvancedTableEmptyState } from '../advanced-table-empty-state/index.js';
import { AdvancedTableRow } from '../advanced-table-row/index.js';

import { styles as advancedTableBodyStyles } from './advanced-table-body.styles.js';

export function AdvancedTableBody<T>() {
  const { table, emptyState } = useAdvancedTableContext<T>();
  const styles = advancedTableBodyStyles();

  const rows = table.getRowModel().rows;
  // Pre-pagination row count: `rows` above is page-scoped when pagination is
  // enabled, so an out-of-range page (e.g. data shrank while on a later page)
  // would otherwise be misreported as "no data" even though rows exist.
  const isEmpty = table.getPrePaginationRowModel().rows.length === 0;
  // At least 1 so the empty-state cell never emits an invalid `colspan="0"`.
  const leafColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);

  return (
    <tbody className={styles.tableBody()}>
      {isEmpty ? (
        <tr>
          <td colSpan={leafColumnCount} className={styles.emptyCell()}>
            <AdvancedTableEmptyState {...emptyState} />
          </td>
        </tr>
      ) : (
        rows.map(row => <AdvancedTableRow key={row.id} row={row} />)
      )}
    </tbody>
  );
}

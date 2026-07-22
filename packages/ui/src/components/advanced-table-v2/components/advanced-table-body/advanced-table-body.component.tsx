import { Row } from '@tanstack/react-table';

import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { AdvancedTableEmptyState } from '../advanced-table-empty-state/index.js';
import { AdvancedTableGroupRow } from '../advanced-table-group-row/index.js';
import { AdvancedTableLoadingState } from '../advanced-table-loading-state/index.js';
import { AdvancedTableRow } from '../advanced-table-row/index.js';

import { styles as advancedTableBodyStyles } from './advanced-table-body.styles.js';

export function AdvancedTableBody<T>() {
  const { table, emptyState, loading, loadingStateProps } = useAdvancedTableContext<T>();
  const styles = advancedTableBodyStyles();

  const isEmptyDataset = table.getPrePaginationRowModel().rows.length === 0;
  // At least 1 so the empty-state cell never emits an invalid `colspan="0"`.
  const leafColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);

  // Check if empty state is caused by a filter
  const isFilteredEmpty = isEmptyDataset && table.getState().columnFilters.length > 0;
  const filteredEmptyDefaults = isFilteredEmpty
    ? { title: 'No matching results', description: 'Try adjusting or clearing your filter.' }
    : {};

  const isLoadingEmpty = loading && isEmptyDataset;

  // We don't pin to bottom rows: Top is pinned, center are unpinned/paginated rows
  const pinnedRows = table.getTopRows();
  const centerRows = table.getCenterRows();

  const renderRow = (row: Row<T>, isPinned = false) =>
    row.getIsGrouped() ? (
      <AdvancedTableGroupRow key={row.id} row={row} />
    ) : (
      <AdvancedTableRow isPinned={isPinned} key={row.id} row={row} />
    );

  let bodyContent;
  if (isLoadingEmpty) {
    bodyContent = (
      <tr>
        <td className={styles.emptyCell()} colSpan={leafColumnCount}>
          <AdvancedTableLoadingState {...loadingStateProps} />
        </td>
      </tr>
    );
  } else if (isEmptyDataset) {
    bodyContent = (
      <tr>
        <td className={styles.emptyCell()} colSpan={leafColumnCount}>
          <AdvancedTableEmptyState {...filteredEmptyDefaults} {...emptyState} />
        </td>
      </tr>
    );
  } else {
    bodyContent = centerRows.map(row => renderRow(row));
  }

  return (
    <>
      {pinnedRows.length > 0 && (
        <tbody className={styles.tableBody()}>{pinnedRows.map(row => renderRow(row, true))}</tbody>
      )}
      <tbody className={styles.tableBody()}>{bodyContent}</tbody>
    </>
  );
}

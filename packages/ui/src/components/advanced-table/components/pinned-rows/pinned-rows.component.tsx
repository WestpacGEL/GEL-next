import { AdvancedTableRow } from '../advanced-table-row/advanced-table-row.component.js';

import { styles as pinnedRowsStyles } from './pinned-rows.styles.js';
import { PinnedRowsProps } from './pinned-rows.types.js';

export function PinnedRows<T>({ rows, scrollableRows, theadRef }: PinnedRowsProps<T>) {
  const styles = pinnedRowsStyles();
  if (rows.length === 0) return null;
  return (
    <tbody
      className={styles.tableBody()}
      style={scrollableRows ? { top: `${theadRef?.current?.offsetHeight ?? 0}px` } : undefined}
    >
      {rows.map(row => (
        <AdvancedTableRow key={row.id} row={row} isPinned />
      ))}
    </tbody>
  );
}

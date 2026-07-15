import { flexRender } from '@tanstack/react-table';

import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as advancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell }: AdvancedTableCellProps<T>) {
  const { padding, bordered } = useAdvancedTableContext<T>();

  const { column } = cell;
  const isPinned = column.getIsPinned();
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');
  let pinnedEdge: 'left' | 'right' | undefined;
  if (isLastLeftPinned) pinnedEdge = 'left';
  else if (isFirstRightPinned) pinnedEdge = 'right';
  const styles = advancedTableCellStyles({ padding, bordered, isPinned: Boolean(isPinned), pinnedEdge });

  return (
    <td
      className={styles.td()}
      style={{
        // Column width comes from the root <colgroup> (table-layout: fixed),
        // which is what makes these sticky offsets (computed from the same
        // `column.getSize()`) actually line up with a pinned column's real edge.
        position: isPinned ? 'sticky' : undefined,
        left: isPinned === 'left' ? column.getStart('left') : undefined,
        right: isPinned === 'right' ? column.getAfter('right') : undefined,
        zIndex: isPinned ? 1 : undefined,
      }}
    >
      <div className={styles.cellContent()}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
    </td>
  );
}

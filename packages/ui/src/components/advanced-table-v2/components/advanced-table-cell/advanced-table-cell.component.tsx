import { flexRender } from '@tanstack/react-table';

import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { getColumnPinningStyleInfo, RESERVED_COLUMN_IDS } from '../../utils/index.js';

import { styles as advancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell }: AdvancedTableCellProps<T>) {
  const { padding, bordered, enableColumnPinning } = useAdvancedTableContext<T>();

  const { column } = cell;
  const { isPinned, pinnedEdge, style: pinningStyle } = getColumnPinningStyleInfo(column);
  // See advanced-table-head.component.tsx: the reserved selection column is
  // always structurally sticky, but only gets the pinned-look styling when
  // the pinning feature is actually enabled.
  const isReserved = RESERVED_COLUMN_IDS.includes(column.id);
  const showPinnedStyling = isPinned && (!isReserved || Boolean(enableColumnPinning));
  const styles = advancedTableCellStyles({
    padding,
    bordered,
    isPinned: showPinnedStyling,
    pinnedEdge: showPinnedStyling ? pinnedEdge : undefined,
  });

  return (
    <td className={styles.td()} style={pinningStyle}>
      <div className={styles.cellContent()}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
    </td>
  );
}

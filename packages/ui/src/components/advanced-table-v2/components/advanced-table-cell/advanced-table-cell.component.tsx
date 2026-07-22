import { flexRender } from '@tanstack/react-table';

import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { getColumnMeta, getColumnPinningStyleInfo, RESERVED_COLUMN_IDS } from '../../utils/index.js';

import { styles as advancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell }: AdvancedTableCellProps<T>) {
  const { bordered, enableColumnPinning, padding } = useAdvancedTableContext<T>();
  const { column } = cell;
  const { isPinned, pinnedEdge, style: pinningStyle } = getColumnPinningStyleInfo(column);

  // The reserved columns is always structurally sticky but apply the styles only when pinning is table enabled
  const isReserved = RESERVED_COLUMN_IDS.includes(column.id);
  const showPinnedStyling = isPinned && (!isReserved || Boolean(enableColumnPinning));

  const { align, isRowHeader, overflow } = getColumnMeta(column);
  const styles = advancedTableCellStyles({
    align,
    bordered,
    isPinned: showPinnedStyling,
    overflow,
    padding,
    pinnedEdge: showPinnedStyling ? pinnedEdge : undefined,
  });

  const content = (
    <div className={styles.cellContent()}>
      <span className={styles.cellText()}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
    </div>
  );

  return isRowHeader ? (
    <th className={styles.td()} scope="row" style={pinningStyle}>
      {content}
    </th>
  ) : (
    <td className={styles.td()} style={pinningStyle}>
      {content}
    </td>
  );
}

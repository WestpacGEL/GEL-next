import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';
import { CSSProperties, useContext } from 'react';

import { AdvancedTableContext } from '../../advanced-table.context.js';
import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';

import { styles as AdvancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell, rowRef }: AdvancedTableCellProps<T>) {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });
  const isColumnPinned = !!cell.column.getIsPinned();
  const isRowPinned = !!cell.row.getIsPinned();
  const dndStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };
  const { scrollableRows, extraCellPadding, bordered } = useContext(AdvancedTableContext);

  const styles = AdvancedTableCellStyles({
    scrollableRows,
    isPinned: isColumnPinned,
    isRowPinned,
    extraCellPadding,
    bordered,
  });
  return (
    <td
      className={styles.td()}
      style={{ ...dndStyles, ...getCommonPinningStyles(cell.column) }}
      ref={setNodeRef}
      id={cell.id}
    >
      {!cell.getIsPlaceholder() ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
    </td>
  );
}

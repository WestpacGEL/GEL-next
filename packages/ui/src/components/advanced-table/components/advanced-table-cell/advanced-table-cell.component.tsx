import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';
import { CSSProperties, useContext } from 'react';

import { AdvancedTableContext } from '../../advanced-table.component.js';
import { handleTableCellKeyDown } from '../../utils/accessibility-functions.js';
import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';

import { styles as AdvancedTableCellStyles } from './advanced-table-cell.styles.js';
import { AdvancedTableCellProps } from './advanced-table-cell.types.js';

export function AdvancedTableCell<T>({ cell, rowRef }: AdvancedTableCellProps<T>) {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });
  const isPinned = !!cell.column.getIsPinned();
  const dndStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };
  const { scrollableRows } = useContext(AdvancedTableContext);

  const styles = AdvancedTableCellStyles({ scrollableRows, isPinned });
  return (
    <td
      className={styles.td()}
      tabIndex={0}
      style={{ ...dndStyles, ...getCommonPinningStyles(cell.column) }}
      ref={setNodeRef}
      onKeyDown={event => handleTableCellKeyDown(event, cell, rowRef)}
      id={cell.id}
    >
      {!cell.getIsPlaceholder() ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
    </td>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, useContext } from 'react';

import { AdvancedTableContext } from '../../advanced-table.context.js';
import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';
import { AdvancedTableHeadCellContent } from '../advanced-table-head-cell-content/advanced-table-head-cell-content.component.js';

import { styles as advancedTableHeadCellStyles } from './advanced-table-head-cell.styles.js';
import { AdvancedTableHeadCellProps } from './advanced-table-head-cell.types.js';

export function AdvancedTableHeadCell<T>({ header, scrollableColumns }: AdvancedTableHeadCellProps<T>) {
  const { scrollableRows, fillContainer } = useContext(AdvancedTableContext);
  const { isDragging, setNodeRef, transform } = useSortable({ id: header.column.id });
  const dndStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 1 : 0,
  };

  const styles = advancedTableHeadCellStyles();

  return (
    <th
      style={{
        width: `calc(var(--header-${header.id}-size) * 1px)`,
        ...dndStyles,
        ...(scrollableColumns ? getCommonPinningStyles(header.column, scrollableColumns) : undefined),
        // When filling the container with virtualized rows, let header cells grow to
        // consume any trailing space inside the flex header row.
        ...(fillContainer && scrollableRows && !scrollableColumns ? { flex: '1 1 auto' } : {}),
      }}
      key={header.id}
      colSpan={header.colSpan}
      className={styles.th()}
      ref={setNodeRef}
    >
      <AdvancedTableHeadCellContent header={header} />
    </th>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';

import { styles as AdvancedTableHeadCellStyles } from './advanced-table-head-cell.styles.js';
import { AdvancedTableHeadCellProps } from './advanced-table-head-cell.types.js';
import { HeadCellContent } from './head-cell-content/head-cell-content.component.js';

export function AdvancedTableHeadCell<T>({ header, scrollableColumns }: AdvancedTableHeadCellProps<T>) {
  const { isDragging, setNodeRef, transform } = useSortable({ id: header.column.id });
  const dndStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 1 : 0,
  };

  const styles = AdvancedTableHeadCellStyles({ scrollableColumns });
  // TODO: Potentially don't need conditional
  return scrollableColumns ? (
    <th
      style={{
        width: `calc(var(--header-${header.id}-size) * 1px)`,
        ...dndStyles,
        ...getCommonPinningStyles(header.column),
      }}
      key={header.id}
      colSpan={header.colSpan}
      className={styles.th()}
      ref={setNodeRef}
    >
      <HeadCellContent header={header} />
    </th>
  ) : (
    <th
      style={{
        width: `calc(var(--header-${header.id}-size) * 1px)`,
        ...dndStyles,
      }}
      key={header.id}
      colSpan={header.colSpan}
      className={styles.th()}
      ref={setNodeRef}
    >
      <HeadCellContent header={header} />
    </th>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Header } from '@tanstack/react-table';
import { CSSProperties } from 'react';

import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../../../icon/index.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { ColumnReorderInfo, useAdvancedTableContext } from '../../advanced-table.context.js';
import {
  canGroupColumn,
  canPinColumn,
  canResizeColumn,
  getColumnPinningStyleInfo,
  RESERVED_COLUMN_IDS,
} from '../../utils/index.js';
import { AdvancedTableColumnMenu } from '../advanced-table-column-menu/index.js';
import { AdvancedTableResizeHandle } from '../advanced-table-resize-handle/index.js';

import { styles as advancedTableHeadStyles } from './advanced-table-head.styles.js';
import { AdvancedTableHeaderCellProps } from './advanced-table-head.types.js';

/** Maps a column's sortability + current direction to the `aria-sort` value. */
function getAriaSort(canSort: boolean, direction: false | 'asc' | 'desc') {
  if (!canSort) return undefined;
  if (direction === 'asc') return 'ascending';
  if (direction === 'desc') return 'descending';
  return 'none';
}

/**
 * Resolves which per-column controls this header cell shows. Split out from
 * the component to keep its cognitive complexity down — each capability has
 * its own reserved/leaf/pinned exclusions (see each line's comment below).
 */
function getColumnCapabilities<T>(
  header: Header<T, unknown>,
  reorderInfo: ColumnReorderInfo,
  enableColumnReordering: boolean | undefined,
) {
  const { column } = header;
  const isReserved = RESERVED_COLUMN_IDS.includes(column.id);
  const canPin = canPinColumn(column);
  const canGroup = canGroupColumn(column);
  const canResize = canResizeColumn(column);
  // Only the top header row's real cells are reorderable — nested leaves under
  // a group move with their group as one unit, never independently.
  const isTopRow = header.headerGroup.depth === 0;
  const canReorder =
    Boolean(enableColumnReordering) && isTopRow && !header.isPlaceholder && reorderInfo.idSet.has(column.id);
  return { isReserved, canPin, canGroup, canResize, canReorder };
}

/** Renders a single header cell: the label plus (when sortable) the sort toggle. */
function AdvancedTableHeaderCell<T>({ header }: AdvancedTableHeaderCellProps<T>) {
  const { tableId, padding, bordered, enableColumnPinning, enableColumnReordering, reorderInfo, loading } =
    useAdvancedTableContext<T>();

  const { column } = header;
  const canSort = column.getCanSort();
  const sortDirection = column.getIsSorted();

  const ariaSort = getAriaSort(canSort, sortDirection);
  const labelId = `${tableId}-${header.id}-label`;
  const sortActionId = `${tableId}-${header.id}-sort-action`;
  const nextSortLabel = (() => {
    switch (column.getNextSortingOrder()) {
      case 'asc':
        return 'Sort ascending';
      case 'desc':
        return 'Sort descending';
      default:
        return 'Clear sort';
    }
  })();

  const { isReserved, canPin, canGroup, canResize, canReorder } = getColumnCapabilities(
    header,
    reorderInfo,
    enableColumnReordering,
  );
  const { isPinned, pinnedEdge, style: pinningStyle } = getColumnPinningStyleInfo(column);
  // The reserved selection column is always structurally sticky but only gets the pinned-look
  // styling when the pinning feature is actually enabled
  const showPinnedStyling = isPinned && (!isReserved || Boolean(enableColumnPinning));
  const styles = advancedTableHeadStyles({
    padding,
    bordered,
    isPinned: showPinnedStyling,
    pinnedEdge: showPinnedStyling ? pinnedEdge : undefined,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: column.id,
    disabled: !canReorder,
  });

  const dragStyle: CSSProperties = canReorder
    ? { transform: CSS.Translate.toString(transform), zIndex: isDragging ? 2 : pinningStyle.zIndex }
    : {};

  return (
    <th
      aria-sort={header.isPlaceholder ? undefined : ariaSort}
      className={styles.th({ isDragging: canReorder && isDragging })}
      colSpan={header.colSpan}
      ref={canReorder ? setNodeRef : undefined}
      scope="col"
      style={{ ...pinningStyle, ...dragStyle }}
    >
      {header.isPlaceholder ? null : (
        <div className={styles.headerContent()}>
          {canReorder ? (
            <button type="button" disabled={loading} className={styles.dragHandle()} {...attributes} {...listeners}>
              <span id={labelId}>{flexRender(column.columnDef.header, header.getContext())}</span>
            </button>
          ) : (
            <span id={labelId}>{flexRender(column.columnDef.header, header.getContext())}</span>
          )}
          {canSort && (
            <button
              aria-labelledby={`${labelId} ${sortActionId}`}
              className={styles.sortButton()}
              disabled={loading}
              onClick={column.getToggleSortingHandler()}
              type="button"
            >
              {!sortDirection && <SortIcon aria-hidden size="small" />}
              {sortDirection === 'asc' && <ArrowUpIcon aria-hidden size="small" />}
              {sortDirection === 'desc' && <ArrowDownIcon aria-hidden size="small" />}
              <VisuallyHidden id={sortActionId} tag="span">
                {nextSortLabel}
              </VisuallyHidden>
            </button>
          )}
          {(column.getCanFilter() || canPin || canGroup || canReorder) && !isReserved && (
            <AdvancedTableColumnMenu header={header} />
          )}
          {canResize && !header.isPlaceholder && <AdvancedTableResizeHandle header={header} />}
        </div>
      )}
    </th>
  );
}

export function AdvancedTableHead<T>() {
  const { table } = useAdvancedTableContext<T>();
  const styles = advancedTableHeadStyles();

  return (
    <thead className={styles.thead()}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id} className={styles.headerRow()}>
          {headerGroup.headers.map(header => (
            <AdvancedTableHeaderCell key={header.id} header={header} />
          ))}
        </tr>
      ))}
    </thead>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Header, type SortDirection } from '@tanstack/react-table';
import { CSSProperties } from 'react';

import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../../../icon/index.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { ColumnReorderInfo, useAdvancedTableContext } from '../../advanced-table.context.js';
import { getPrefersReducedMotion } from '../../utils/column-order.js';
import {
  canGroupColumn,
  canPinColumn,
  canResizeColumn,
  getColumnMeta,
  getColumnPinningStyleInfo,
  RESERVED_COLUMN_IDS,
} from '../../utils/index.js';
import { AdvancedTableColumnMenu } from '../advanced-table-column-menu/index.js';
import { AdvancedTableResizeHandle } from '../advanced-table-resize-handle/index.js';

import { styles as advancedTableHeadStyles } from './advanced-table-head.styles.js';
import { AdvancedTableHeaderCellProps } from './advanced-table-head.types.js';

type SortingDirections = SortDirection | false;

function getAriaSort(canSort: boolean, direction: SortingDirections) {
  if (!canSort) return undefined;
  if (direction === 'asc') return 'ascending';
  if (direction === 'desc') return 'descending';
  return 'none';
}

function getNextSortLabel(direction: SortingDirections) {
  switch (direction) {
    case 'asc':
      return 'Sort ascending';
    case 'desc':
      return 'Sort descending';
    default:
      return 'Clear sort';
  }
}

/** Resolves which per-column controls this header cell shows. */
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

  // Only the top header row's real cells are re-orderable (if users are using nested table columns)
  const isTopRow = header.headerGroup.depth === 0;
  const canReorder =
    Boolean(enableColumnReordering) && isTopRow && !header.isPlaceholder && reorderInfo.idSet.has(column.id);

  return { isReserved, canPin, canGroup, canResize, canReorder };
}

/** Renders a single header cell: the label plus (when sortable) the sort toggle. */
function AdvancedTableHeaderCell<T>({ header }: AdvancedTableHeaderCellProps<T>) {
  const { bordered, enableColumnPinning, enableColumnReordering, loading, padding, reorderInfo, tableId } =
    useAdvancedTableContext<T>();

  const { column } = header;
  const canSort = column.getCanSort();
  const sortDirection = column.getIsSorted();
  const ariaSort = getAriaSort(canSort, sortDirection);

  const labelId = `${tableId}-${header.id}-label`;
  const sortActionId = `${tableId}-${header.id}-sort-action`;
  const nextSortLabel = getNextSortLabel(column.getNextSortingOrder());

  const { canGroup, canPin, canReorder, canResize, isReserved } = getColumnCapabilities(
    header,
    reorderInfo,
    enableColumnReordering,
  );
  const { isPinned, pinnedEdge, style: pinningStyle } = getColumnPinningStyleInfo(column);

  // The reserved selection column is always structurally sticky but only gets the pinned-look styling when the pinning feature is actually enabled
  const showPinnedStyling = isPinned && (!isReserved || Boolean(enableColumnPinning));
  const { align } = getColumnMeta(column);
  const styles = advancedTableHeadStyles({
    align,
    bordered,
    isPinned: showPinnedStyling,
    padding,
    pinnedEdge: showPinnedStyling ? pinnedEdge : undefined,
  });

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
    disabled: !canReorder,
  });

  // dnd-kit computes `transition` itself, we don't use Tailwind animation classes or they will clash.
  const dragStyle: CSSProperties = canReorder
    ? {
        transform: CSS.Translate.toString(transform),
        transition: getPrefersReducedMotion() ? undefined : transition,
        zIndex: isDragging ? 2 : pinningStyle.zIndex,
      }
    : {};

  const showColumnMenu = (column.getCanFilter() || canPin || canGroup || canReorder) && !isReserved;

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
            <button className={styles.dragHandle()} disabled={loading} type="button" {...attributes} {...listeners}>
              <span id={labelId}>{flexRender(column.columnDef.header, header.getContext())}</span>
            </button>
          ) : (
            <span id={labelId}>{flexRender(column.columnDef.header, header.getContext())}</span>
          )}
          {canSort && (
            <button
              // using `aria-disabled` over `disabled` to not loose remove
              aria-disabled={loading || undefined}
              aria-labelledby={`${labelId} ${sortActionId}`}
              className={styles.sortButton()}
              onClick={loading ? undefined : column.getToggleSortingHandler()}
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
          {showColumnMenu && <AdvancedTableColumnMenu header={header} />}
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
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr className={styles.headerRow()} key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <AdvancedTableHeaderCell header={header} key={header.id} />
          ))}
        </tr>
      ))}
    </thead>
  );
}

import { flexRender } from '@tanstack/react-table';

import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../../../icon/index.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { RESERVED_COLUMN_IDS } from '../../utils/index.js';
import { AdvancedTableColumnMenu } from '../advanced-table-column-menu/index.js';

import { styles as advancedTableHeadStyles } from './advanced-table-head.styles.js';
import { AdvancedTableHeaderCellProps } from './advanced-table-head.types.js';

/** Maps a column's sortability + current direction to the `aria-sort` value. */
function getAriaSort(canSort: boolean, direction: false | 'asc' | 'desc') {
  if (!canSort) return undefined;
  if (direction === 'asc') return 'ascending';
  if (direction === 'desc') return 'descending';
  return 'none';
}

/** Renders a single header cell: the label plus (when sortable) the sort toggle. */
function AdvancedTableHeaderCell<T>({ header }: AdvancedTableHeaderCellProps<T>) {
  const { tableId, padding, bordered } = useAdvancedTableContext<T>();

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

  const isPinned = column.getIsPinned();
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');
  let pinnedEdge: 'left' | 'right' | undefined;
  if (isLastLeftPinned) pinnedEdge = 'left';
  else if (isFirstRightPinned) pinnedEdge = 'right';
  const styles = advancedTableHeadStyles({ padding, bordered, isPinned: Boolean(isPinned), pinnedEdge });

  return (
    <th
      scope="col"
      colSpan={header.colSpan}
      aria-sort={header.isPlaceholder ? undefined : ariaSort}
      className={styles.th()}
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
      {header.isPlaceholder ? null : (
        <div className={styles.headerContent()}>
          <span id={labelId}>{flexRender(column.columnDef.header, header.getContext())}</span>
          {canSort && (
            <button
              type="button"
              className={styles.sortButton()}
              aria-labelledby={`${labelId} ${sortActionId}`}
              onClick={column.getToggleSortingHandler()}
            >
              {!sortDirection && <SortIcon aria-hidden size="small" />}
              {sortDirection === 'asc' && <ArrowUpIcon aria-hidden size="small" />}
              {sortDirection === 'desc' && <ArrowDownIcon aria-hidden size="small" />}
              <VisuallyHidden id={sortActionId} tag="span">
                {nextSortLabel}
              </VisuallyHidden>
            </button>
          )}
          {(column.getCanFilter() || column.getCanPin()) && !RESERVED_COLUMN_IDS.includes(column.id) && (
            <AdvancedTableColumnMenu header={header} />
          )}
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

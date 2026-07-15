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
  const styles = advancedTableHeadStyles({ padding, bordered });

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

  return (
    <th
      scope="col"
      colSpan={header.colSpan}
      aria-sort={header.isPlaceholder ? undefined : ariaSort}
      className={styles.th()}
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
          {column.getCanFilter() && !RESERVED_COLUMN_IDS.includes(column.id) && (
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

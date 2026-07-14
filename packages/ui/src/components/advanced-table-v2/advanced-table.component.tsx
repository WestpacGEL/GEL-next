'use client';

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useId, useMemo } from 'react';

import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../icon/index.js';
import { VisuallyHidden } from '../visually-hidden/index.js';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableColumn, AdvancedTableProps, AdvancedTableSortingState } from './advanced-table.types.js';
import { AdvancedTableCaption, AdvancedTableEmptyState } from './components/index.js';
import { columnGenerator, useControlledState } from './utils/index.js';

/** Maps a column's sortability + current direction to the `aria-sort` value. */
function getAriaSort(canSort: boolean, direction: false | 'asc' | 'desc') {
  if (!canSort) return undefined;
  if (direction === 'asc') return 'ascending';
  if (direction === 'desc') return 'descending';
  return 'none';
}

const EMPTY_SORTING: AdvancedTableSortingState = [];

/** Finds a column's title by key, recursing through grouped (nested) columns. */
function findColumnTitle<T>(columns: AdvancedTableColumn<T>[], id: string): string | undefined {
  for (const column of columns) {
    if ('columns' in column && Array.isArray(column.columns)) {
      const found = findColumnTitle(column.columns, id);
      if (found !== undefined) return found;
    } else if (String(column.key) === id) {
      return column.title;
    }
  }
  return undefined;
}

/**
 * Data table built on TanStack Table (wired internally and fully hidden). Pass
 * `data` and `columns`; state follows the controlled/uncontrolled prop pattern.
 *
 * This is the rebuilt component. Interactive features — pagination, selection,
 * pinning, reordering, resizing, expansion, editing — are added in later slices.
 */
export function AdvancedTable<T>({
  columns,
  data,
  defaultData,
  onDataChange,
  caption,
  hideCaption,
  id,
  enableSorting,
  sorting: sortingProp,
  defaultSorting: defaultSortingProp,
  onSortingChange: onSortingChangeProp,
  manualSorting,
  background,
  padding,
  bordered,
  fillContainer,
  emptyState,
}: AdvancedTableProps<T>) {
  const generatedId = useId();
  const tableId = id ?? generatedId;

  // Data follows the controlled (`data`) / uncontrolled (`defaultData`) pattern.
  // The setter is used by mutating features (e.g. editing) in a later slice.
  const [tableData] = useControlledState<T[]>(data, defaultData ?? [], onDataChange);
  const [sortingState, setSortingState] = useControlledState<AdvancedTableSortingState>(
    sortingProp,
    defaultSortingProp ?? EMPTY_SORTING,
    onSortingChangeProp,
  );

  const tableColumns = useMemo(() => columnGenerator(columns, { enableSorting }), [columns, enableSorting]);

  const sortAnnouncement = useMemo(() => {
    if (!enableSorting) return null;
    // Empty state doubles as the "cleared" announcement — it is silent on initial
    // mount (live regions do't announce initial content) but is read out when the
    // user removes a sort, so clearing is announced like any other sort change.n
    if (sortingState.length === 0) return 'Sorting cleared.';
    const s = sortingState[0];
    const label = s.desc ? 'sorted descending' : 'sorted ascending';
    const name = findColumnTitle(columns, s.id) ?? s.id;
    return `${name} ${label}`;
  }, [sortingState, columns, enableSorting]);

  const table = useReactTable<T>({
    data: tableData,
    columns: tableColumns,
    state: {
      ...(enableSorting && { sorting: sortingState }),
    },
    ...(enableSorting
      ? {
          enableMultiSort: false,
          enableSortingRemoval: true,
          // Always cycle ascending -> descending -> unsorted, regardless of column
          // type (TanStack defaults number columns to descending-first).
          sortDescFirst: false,
          enableSorting: true,
          getSortedRowModel: getSortedRowModel(),
          // TanStack hands us an updater (value or fn); resolve it before storing.
          onSortingChange: updater => setSortingState(typeof updater === 'function' ? updater(sortingState) : updater),
          manualSorting,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (_row, index, parent) => (parent ? `${parent.id}.${index}` : `${tableId}-${index}`),
  });

  const styles = advancedTableStyles({ background, padding, bordered, fillContainer });

  const isEmpty = tableData.length === 0;
  // At least 1 so the empty-state cell never emits an invalid `colspan="0"`.
  const leafColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);

  return (
    <div className={styles.container()}>
      <table id={tableId} className={styles.table()}>
        {caption ? <AdvancedTableCaption title={caption} hideCaption={hideCaption} hasSorting={enableSorting} /> : null}
        <thead className={styles.thead()}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.headerRow()}>
              {headerGroup.headers.map(header => {
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
                    key={header.id}
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
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody()}>
          {isEmpty ? (
            <tr>
              <td colSpan={leafColumnCount} className={styles.emptyCell()}>
                <AdvancedTableEmptyState {...emptyState} />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className={styles.row()}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={styles.td()}>
                    <div className={styles.cellContent()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {enableSorting && (
        <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
          {sortAnnouncement}
        </div>
      )}
    </div>
  );
}

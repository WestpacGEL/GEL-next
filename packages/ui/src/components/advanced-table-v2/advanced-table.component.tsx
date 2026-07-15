'use client';

import { useControlledState } from '@react-stately/utils';
import { OnChangeFn, RowSelectionState, useReactTable } from '@tanstack/react-table';
import { useId, useMemo } from 'react';

import { AdvancedTableProvider, AdvancedTableContextValue } from './advanced-table.context.js';
import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTablePaginationState, AdvancedTableProps, AdvancedTableSortingState } from './advanced-table.types.js';
import {
  AdvancedTableBody,
  AdvancedTableCaption,
  AdvancedTableHead,
  AdvancedTablePagination,
} from './components/index.js';
import {
  buildReservedColumns,
  buildTableOptions,
  columnGenerator,
  idsToSelectionState,
  resolveRowId,
  selectionStateToIds,
} from './utils/index.js';

const EMPTY_DATA: never[] = [];
const EMPTY_SORTING: AdvancedTableSortingState = [];
const DEFAULT_PAGINATION: AdvancedTablePaginationState = { pageIndex: 0, pageSize: 10 };
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const EMPTY_SELECTED_ROW_IDS: never[] = [];

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
  caption,
  hideCaption,
  id,
  enableSorting,
  sorting: sortingProp,
  defaultSorting: defaultSortingProp,
  onSortingChange: onSortingChangeProp,
  manualSorting,
  enablePagination = true,
  pagination: paginationProp,
  defaultPagination: defaultPaginationProp,
  onPaginationChange: onPaginationChangeProp,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  enableRowSelection,
  rowKey,
  selectedRows: selectedRowsProp,
  defaultSelectedRows: defaultSelectedRowsProp,
  onSelectionChange: onSelectionChangeProp,
  background,
  padding,
  bordered,
  fillContainer,
  emptyState,
}: AdvancedTableProps<T>) {
  const generatedId = useId();
  const tableId = id ?? generatedId;
  const resolvedData = data ?? defaultData ?? EMPTY_DATA;

  const [sortingState, setSortingState] = useControlledState<AdvancedTableSortingState>(
    sortingProp,
    defaultSortingProp ?? EMPTY_SORTING,
    onSortingChangeProp,
  );

  const [paginationState, setPaginationState] = useControlledState<AdvancedTablePaginationState>(
    paginationProp,
    defaultPaginationProp ?? {
      pageIndex: 0,
      pageSize: pageSizeOptions.includes(DEFAULT_PAGINATION.pageSize)
        ? DEFAULT_PAGINATION.pageSize
        : pageSizeOptions[0],
    },
    onPaginationChangeProp,
  );

  const [selectedRowIds, setSelectedRowIds] = useControlledState<string[]>(
    selectedRowsProp,
    defaultSelectedRowsProp ?? EMPTY_SELECTED_ROW_IDS,
    onSelectionChangeProp,
  );

  // Ids that actually match a current row — used to drop stale ids (e.g. a row
  // removed from `data` while still present in a controlled `selectedRows`)
  // before they reach TanStack, so they can't make the select-all checkbox read
  // as indeterminate/checked when nothing currently visible is actually selected.
  const validRowIds = useMemo(() => {
    if (!rowKey) return new Set<string>();
    return new Set(resolvedData.map(row => resolveRowId(rowKey, row)));
  }, [resolvedData, rowKey]);

  const rowSelectionState = useMemo(
    () => idsToSelectionState(selectedRowIds, validRowIds),
    [selectedRowIds, validRowIds],
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelectionState) : updaterOrValue;
    setSelectedRowIds(selectionStateToIds(next));
  };

  const tableColumns = useMemo(
    () => [...buildReservedColumns<T>({ enableRowSelection }), ...columnGenerator(columns, { enableSorting })],
    [columns, enableSorting, enableRowSelection],
  );

  // TanStack hands `onSortingChange` an updater; react-stately's setter accepts a
  // `SetStateAction`, so the updater passes straight through with no unwrapping.
  const table = useReactTable<T>(
    buildTableOptions<T>({
      data: resolvedData,
      columns: tableColumns,
      tableId,
      enableSorting,
      sortingState,
      onSortingChange: setSortingState,
      manualSorting,
      enablePagination,
      paginationState,
      onPaginationChange: setPaginationState,
      rowKey,
      enableRowSelection,
      rowSelectionState,
      onRowSelectionChange: handleRowSelectionChange,
    }),
  );

  const sortAnnouncement = useMemo(() => {
    if (!enableSorting) return null;
    // The empty state doubles as the "cleared" announcement — it is silent on
    // initial mount (live regions don't announce initial content) but is read out
    // when the user removes a sort, so clearing is announced like any other change.
    if (sortingState.length === 0) return 'Sorting cleared.';
    const s = sortingState[0];
    const label = s.desc ? 'sorted descending' : 'sorted ascending';
    // `columnDef.header` is set to the column's title (a string) by columnGenerator.
    const header = table.getColumn(s.id)?.columnDef.header;
    const name = typeof header === 'string' ? header : s.id;
    return `${name} ${label}`;
  }, [sortingState, table, enableSorting]);

  const styles = advancedTableStyles({ bordered, fillContainer });

  // Keyed using referenced `pageSizeOptions` so new array doesn't force re-renders
  const pageSizeOptionsKey = pageSizeOptions.join(',');
  const contextValue = useMemo<AdvancedTableContextValue<T>>(
    () => ({ table, tableId, emptyState, pageSizeOptions, background, padding, bordered }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, tableId, emptyState, pageSizeOptionsKey, background, padding, bordered],
  );

  return (
    <AdvancedTableProvider value={contextValue as AdvancedTableContextValue<unknown>}>
      <div className={styles.root()}>
        <div className={styles.container()}>
          <table id={tableId} className={styles.table()}>
            {caption ? (
              <AdvancedTableCaption title={caption} hideCaption={hideCaption} hasSorting={enableSorting} />
            ) : null}
            <AdvancedTableHead />
            <AdvancedTableBody />
          </table>
        </div>
        {enablePagination && <AdvancedTablePagination />}
        {enableSorting && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {sortAnnouncement}
          </div>
        )}
      </div>
    </AdvancedTableProvider>
  );
}

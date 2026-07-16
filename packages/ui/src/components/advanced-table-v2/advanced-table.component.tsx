'use client';

import { useControlledState } from '@react-stately/utils';
import {
  ColumnFiltersState,
  ColumnPinningState,
  ExpandedState,
  OnChangeFn,
  Row,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { useId, useMemo, useState } from 'react';

import { AdvancedTableProvider, AdvancedTableContextValue } from './advanced-table.context.js';
import { styles as advancedTableStyles } from './advanced-table.styles.js';
import {
  AdvancedTableColumnFiltersState,
  AdvancedTableColumnPinningState,
  AdvancedTableExpandedState,
  AdvancedTableGroupingState,
  AdvancedTablePaginationState,
  AdvancedTableProps,
  AdvancedTableSortingState,
} from './advanced-table.types.js';
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
  expandedStateToIds,
  idsToExpandedState,
  idsToSelectionState,
  resolveRowId,
  RESERVED_COLUMN_IDS,
  selectionStateToIds,
  SELECT_COLUMN_ID,
} from './utils/index.js';

const EMPTY_DATA: never[] = [];
const EMPTY_SORTING: AdvancedTableSortingState = [];
const DEFAULT_PAGINATION: AdvancedTablePaginationState = { pageIndex: 0, pageSize: 10 };
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const EMPTY_SELECTED_ROW_IDS: never[] = [];
const EMPTY_COLUMN_FILTERS: AdvancedTableColumnFiltersState = [];
const EMPTY_COLUMN_PINNING: AdvancedTableColumnPinningState = {};
const EMPTY_GROUPING: AdvancedTableGroupingState = [];
const EMPTY_EXPANDED: AdvancedTableExpandedState = [];

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
  enableColumnFilter,
  columnFilters: columnFiltersProp,
  defaultColumnFilters: defaultColumnFiltersProp,
  onColumnFiltersChange: onColumnFiltersChangeProp,
  manualFiltering,
  enableColumnPinning,
  columnPinning: columnPinningProp,
  defaultColumnPinning: defaultColumnPinningProp,
  onColumnPinningChange: onColumnPinningChangeProp,
  enableGrouping,
  grouping: groupingProp,
  defaultGrouping: defaultGroupingProp,
  onGroupingChange: onGroupingChangeProp,
  expanded: expandedProp,
  defaultExpanded: defaultExpandedProp,
  onExpandedChange: onExpandedChangeProp,
  renderDetailPanel,
  getRowCanExpand,
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

  const [columnFiltersState, setColumnFiltersState] = useControlledState<AdvancedTableColumnFiltersState>(
    columnFiltersProp,
    defaultColumnFiltersProp ?? EMPTY_COLUMN_FILTERS,
    onColumnFiltersChangeProp,
  );

  const [columnPinningState, setColumnPinningState] = useControlledState<AdvancedTableColumnPinningState>(
    columnPinningProp,
    defaultColumnPinningProp ?? EMPTY_COLUMN_PINNING,
    onColumnPinningChangeProp,
  );

  const [groupingState, setGroupingState] = useControlledState<AdvancedTableGroupingState>(
    groupingProp,
    defaultGroupingProp ?? EMPTY_GROUPING,
    onGroupingChangeProp,
  );

  // Grouping's rows start fully expanded by default (so a newly-grouped
  // column's children are visible immediately) — no other special-casing:
  // `true` flows through the same converters/handler as any other expansion
  // state below. NOTE: `true` expands the *entire* table, not just group
  // rows — if `enableGrouping` is combined with unrelated tree/subRows data
  // on the same table, that data starts expanded too. Known, accepted
  // limitation for this rare cross-feature combo (same deferred-combo
  // precedent as grouping x pinning, ticket 14).
  const [expandedState, setExpandedState] = useControlledState<AdvancedTableExpandedState>(
    expandedProp,
    defaultExpandedProp ?? (enableGrouping ? true : EMPTY_EXPANDED),
    onExpandedChangeProp,
  );

  const [pinAnnouncement, setPinAnnouncement] = useState('');

  // Drops stale ids (e.g. a row removed from `data` but still in a controlled
  // `selectedRows`) before they reach TanStack, so select-all can't read as
  // indeterminate over rows that no longer exist.
  const validRowIds = useMemo(() => {
    if (!rowKey) return new Set<string>();
    return new Set(resolvedData.map(row => resolveRowId(rowKey, row)));
  }, [resolvedData, rowKey]);

  const rowSelectionState = useMemo(
    () => idsToSelectionState(selectedRowIds, validRowIds),
    [selectedRowIds, validRowIds],
  );

  // Not filtered against `validRowIds()` like selection is above — expansion ids
  // can include ids TanStack makes up itself (e.g. for grouped rows), which
  // validRowIds wouldn't recognize. See idsToExpandedState (utils/row-id.ts).
  const resolvedExpandedState = useMemo(() => idsToExpandedState(expandedState), [expandedState]);

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelectionState) : updaterOrValue;
    setSelectedRowIds(selectionStateToIds(next));
  };

  const handleExpandedChange: OnChangeFn<ExpandedState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedExpandedState) : updaterOrValue;
    setExpandedState(expandedStateToIds(next));
  };

  // TanStack's own default `getRowCanExpand` only returns true for rows with
  // `subRows` — which would silently block `renderDetailPanel` from ever
  // opening on a leaf row.
  const resolvedGetRowCanExpand = useMemo<((row: Row<T>) => boolean) | undefined>(() => {
    if (getRowCanExpand) return row => getRowCanExpand(row.original, { depth: row.depth });
    if (renderDetailPanel) return () => true;
    return undefined;
  }, [getRowCanExpand, renderDetailPanel]);

  // TanStack types filter `value` as `unknown`; the public contract narrows it
  // to `string`, so the updater is resolved here rather than passed straight
  // through like sorting's setter.
  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = updaterOrValue => {
    const current: ColumnFiltersState = columnFiltersState;
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue;
    setColumnFiltersState(next.map(filter => ({ id: filter.id, value: String(filter.value) })));
  };

  // Forces the reserved selection column into `left`; never leaks into the
  // public columnPinning contract (stripped again in the change handler below,
  // via the same RESERVED_COLUMN_IDS list so a future reserved column can't
  // slip through either side by accident).
  const resolvedColumnPinningState = useMemo(() => {
    const userLeft = (columnPinningState.left ?? []).filter(id => !RESERVED_COLUMN_IDS.includes(id));
    const left = enableRowSelection ? [SELECT_COLUMN_ID, ...userLeft] : userLeft;
    const right = (columnPinningState.right ?? []).filter(id => !RESERVED_COLUMN_IDS.includes(id));
    return { left, right };
  }, [columnPinningState, enableRowSelection]);

  const handleColumnPinningChange: OnChangeFn<ColumnPinningState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedColumnPinningState) : updaterOrValue;
    setColumnPinningState({
      left: (next.left ?? []).filter(id => !RESERVED_COLUMN_IDS.includes(id)),
      right: (next.right ?? []).filter(id => !RESERVED_COLUMN_IDS.includes(id)),
    });
  };

  const hasDetailPanel = Boolean(renderDetailPanel);
  const tableColumns = useMemo(
    () => [
      ...buildReservedColumns<T>({ enableRowSelection }),
      ...columnGenerator(columns, {
        enableSorting,
        enableColumnFilter,
        enableColumnPinning,
        enableGrouping,
        hasDetailPanel,
        tableId,
      }),
    ],
    [
      columns,
      enableSorting,
      enableRowSelection,
      enableColumnFilter,
      enableColumnPinning,
      enableGrouping,
      hasDetailPanel,
      tableId,
    ],
  );

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
      enableColumnFilter,
      columnFiltersState,
      onColumnFiltersChange: handleColumnFiltersChange,
      manualFiltering,
      enableColumnPinning,
      columnPinningState: resolvedColumnPinningState,
      onColumnPinningChange: handleColumnPinningChange,
      hasReservedPinning: Boolean(enableRowSelection),
      enableGrouping,
      groupingState,
      onGroupingChange: setGroupingState,
      expandedState: resolvedExpandedState,
      onExpandedChange: handleExpandedChange,
      getRowCanExpand: resolvedGetRowCanExpand,
    }),
  );

  const sortAnnouncement = useMemo(() => {
    if (!enableSorting) return null;
    // Doubles as the "cleared" announcement: silent on mount (live regions
    // don't announce initial content), read out once a sort is removed.
    if (sortingState.length === 0) return 'Sorting cleared.';
    const s = sortingState[0];
    const label = s.desc ? 'sorted descending' : 'sorted ascending';
    // `columnDef.header` is set to the column's title (a string) by columnGenerator.
    const header = table.getColumn(s.id)?.columnDef.header;
    const name = typeof header === 'string' ? header : s.id;
    return `${name} ${label}`;
  }, [sortingState, table, enableSorting]);

  const filterAnnouncement = useMemo(() => {
    if (!enableColumnFilter) return null;
    // Mirrors the sorting announcement above (silent on mount, read on clear).
    if (columnFiltersState.length === 0) return 'Filter cleared.';
    const matchCount = table.getFilteredRowModel().rows.length;
    return `${matchCount} matching row${matchCount === 1 ? '' : 's'}.`;
  }, [columnFiltersState, table, enableColumnFilter]);

  const groupAnnouncement = useMemo(() => {
    if (!enableGrouping) return null;
    // Mirrors the sorting/filter announcements above (silent on mount, read on clear).
    if (groupingState.length === 0) return 'Grouping cleared.';
    const columnId = groupingState[0];
    const header = table.getColumn(columnId)?.columnDef.header;
    const name = typeof header === 'string' ? header : columnId;
    return `Grouped by ${name}.`;
  }, [groupingState, table, enableGrouping]);

  const styles = advancedTableStyles({ bordered, fillContainer });

  // `getVisibleLeafColumns()` is TanStack-memoized (stable reference until the
  // column set/order/pinning actually changes), so deriving from it keeps the
  // <colgroup> and total width from being rebuilt on every unrelated re-render.
  const visibleLeafColumns = table.getVisibleLeafColumns();
  const totalSize = useMemo(
    () => visibleLeafColumns.reduce((sum, column) => sum + column.getSize(), 0),
    [visibleLeafColumns],
  );
  const tableWidth = `${totalSize}px`;
  const colgroupColumns = useMemo(
    () => visibleLeafColumns.map(column => <col key={column.id} style={{ width: column.getSize() }} />),
    [visibleLeafColumns],
  );

  // Keyed using referenced `pageSizeOptions` so new array doesn't force re-renders
  const pageSizeOptionsKey = pageSizeOptions.join(',');
  const contextValue = useMemo<AdvancedTableContextValue<T>>(
    () => ({
      table,
      tableId,
      emptyState,
      pageSizeOptions,
      background,
      padding,
      bordered,
      enableColumnPinning,
      onPinAnnouncement: setPinAnnouncement,
      renderDetailPanel,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      table,
      tableId,
      emptyState,
      pageSizeOptionsKey,
      background,
      padding,
      bordered,
      enableColumnPinning,
      renderDetailPanel,
    ],
  );

  return (
    <AdvancedTableProvider value={contextValue as AdvancedTableContextValue<unknown>}>
      <div className={styles.root()}>
        <div className={styles.container()}>
          <table id={tableId} className={styles.table()} style={{ width: tableWidth }}>
            {caption ? (
              <AdvancedTableCaption
                title={caption}
                hideCaption={hideCaption}
                hasSorting={enableSorting}
                hasGrouping={Boolean(enableGrouping)}
              />
            ) : null}
            <colgroup>{colgroupColumns}</colgroup>
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
        {enableColumnFilter && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {filterAnnouncement}
          </div>
        )}
        {enableColumnPinning && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {pinAnnouncement}
          </div>
        )}
        {enableGrouping && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {groupAnnouncement}
          </div>
        )}
      </div>
    </AdvancedTableProvider>
  );
}

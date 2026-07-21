'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useControlledState } from '@react-stately/utils';
import {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ExpandedState,
  OnChangeFn,
  Row,
  RowPinningState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { useId, useMemo, useState } from 'react';

import { AdvancedTableProvider, AdvancedTableContextValue } from './advanced-table.context.js';
import { styles as advancedTableStyles } from './advanced-table.styles.js';
import {
  AdvancedTableColumnFiltersState,
  AdvancedTableColumnOrderState,
  AdvancedTableColumnPinningState,
  AdvancedTableColumnSizingState,
  AdvancedTableExpandedState,
  AdvancedTableGroupingState,
  AdvancedTablePaginationState,
  AdvancedTablePinnedRowsState,
  AdvancedTableProps,
  AdvancedTableSortingState,
} from './advanced-table.types.js';
import {
  AdvancedTableBody,
  AdvancedTableCaption,
  AdvancedTableHead,
  AdvancedTableLoadingState,
  AdvancedTablePagination,
} from './components/index.js';
import {
  buildReorderAnnouncements,
  buildReservedColumns,
  buildTableOptions,
  collapsePinnedRowIds,
  columnGenerator,
  expandedStateToIds,
  expandPinnedRowIds,
  getActiveReservedColumnIds,
  getReorderInfo,
  hasExpandableRows,
  idsToExpandedState,
  idsToSelectionState,
  moveColumnTo,
  resolveRowId,
  RESERVED_COLUMN_IDS,
  selectionStateToIds,
} from './utils/index.js';

// Create constants for defaults to prevent creating Objects every re-render
const EMPTY_DATA: never[] = [];
const EMPTY_SORTING: AdvancedTableSortingState = [];
const DEFAULT_PAGINATION: AdvancedTablePaginationState = { pageIndex: 0, pageSize: 10 };
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const EMPTY_SELECTED_ROW_IDS: never[] = [];
const EMPTY_COLUMN_FILTERS: AdvancedTableColumnFiltersState = [];
const EMPTY_COLUMN_ORDER: AdvancedTableColumnOrderState = [];
const EMPTY_COLUMN_SIZING: AdvancedTableColumnSizingState = {};
const EMPTY_COLUMN_PINNING: AdvancedTableColumnPinningState = {};
const EMPTY_GROUPING: AdvancedTableGroupingState = [];
const EMPTY_EXPANDED: AdvancedTableExpandedState = [];
const EMPTY_PINNED_ROWS: AdvancedTablePinnedRowsState = [];
const EMPTY_SENSOR_OPTIONS = {};
const DND_MODIFIERS = [restrictToHorizontalAxis];

/**
 * Data table built on TanStack Table (wired internally and fully hidden). Pass
 * `data` and `columns`; state follows the controlled/uncontrolled prop pattern.
 *
 * This is the rebuilt component. Interactive features — pagination, selection,
 * pinning, resizing, expansion, editing — are added in later slices.
 */
export function AdvancedTable<T>({
  columns,
  data,
  defaultData,
  caption,
  showCaption,
  'aria-labelledby': ariaLabelledBy,
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
  manualPagination,
  rowCount,
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
  enableColumnReordering,
  columnOrder: columnOrderProp,
  defaultColumnOrder: defaultColumnOrderProp,
  onColumnOrderChange: onColumnOrderChangeProp,
  enableColumnResizing,
  columnSizing: columnSizingProp,
  defaultColumnSizing: defaultColumnSizingProp,
  onColumnSizingChange: onColumnSizingChangeProp,
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
  enableRowPinning,
  pinnedRows: pinnedRowsProp,
  defaultPinnedRows: defaultPinnedRowsProp,
  onPinnedRowsChange: onPinnedRowsChangeProp,
  background,
  padding,
  bordered,
  fillContainer,
  tableLayout = 'fixed',
  emptyState,
  loading = false,
  loadingStateProps,
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

  const [columnOrderState, setColumnOrderState] = useControlledState<AdvancedTableColumnOrderState>(
    columnOrderProp,
    defaultColumnOrderProp ?? EMPTY_COLUMN_ORDER,
    onColumnOrderChangeProp,
  );

  const [columnSizingState, setColumnSizingState] = useControlledState<AdvancedTableColumnSizingState>(
    columnSizingProp,
    defaultColumnSizingProp ?? EMPTY_COLUMN_SIZING,
    onColumnSizingChangeProp,
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

  const [pinnedRowIds, setPinnedRowIds] = useControlledState<AdvancedTablePinnedRowsState>(
    pinnedRowsProp,
    defaultPinnedRowsProp ?? EMPTY_PINNED_ROWS,
    onPinnedRowsChangeProp,
  );

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

  // Expands the public, parent-only pinned ids into TanStack's fully-cascaded
  // set (parent + every descendant) by walking `data` directly — see
  // utils/pinned-rows.ts for why this can't go through the `table` instance.
  const resolvedRowPinningState = useMemo<RowPinningState>(
    () => ({ top: expandPinnedRowIds(pinnedRowIds, resolvedData, rowKey), bottom: [] }),
    [pinnedRowIds, resolvedData, rowKey],
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelectionState) : updaterOrValue;
    setSelectedRowIds(selectionStateToIds(next));
  };

  const handleExpandedChange: OnChangeFn<ExpandedState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedExpandedState) : updaterOrValue;
    setExpandedState(expandedStateToIds(next));
  };

  const handleRowPinningChange: OnChangeFn<RowPinningState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedRowPinningState) : updaterOrValue;
    setPinnedRowIds(collapsePinnedRowIds(next.top ?? [], resolvedData, rowKey));
  };

  // TanStack's own default `getRowCanExpand` only returns true for rows with
  // `subRows` — which would silently block `renderDetailPanel` from ever
  // opening on a leaf row.
  const resolvedGetRowCanExpand = useMemo<((row: Row<T>) => boolean) | undefined>(() => {
    if (getRowCanExpand) return row => getRowCanExpand(row.original, { depth: row.depth });
    if (renderDetailPanel) return () => true;
    return undefined;
  }, [getRowCanExpand, renderDetailPanel]);

  // Gates whether the first column reserves space for the expand toggle button.
  const tableHasExpandableRows = useMemo(
    () => hasExpandableRows(resolvedData, getRowCanExpand, Boolean(renderDetailPanel)),
    [resolvedData, getRowCanExpand, renderDetailPanel],
  );

  // TanStack types filter `value` as `unknown`; the public contract narrows it
  // to `string`, so the updater is resolved here rather than passed straight
  // through like sorting's setter.
  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = updaterOrValue => {
    const current: ColumnFiltersState = columnFiltersState;
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue;
    setColumnFiltersState(next.map(filter => ({ id: filter.id, value: String(filter.value) })));
  };

  // Forces the reserved selection/pin columns to the front so a controlled `columnOrder` can never smuggle them out of place.
  const resolvedColumnOrderState = useMemo(() => {
    const reserved = getActiveReservedColumnIds({ enableRowSelection, enableRowPinning });
    const userOrder = columnOrderState.filter(id => !RESERVED_COLUMN_IDS.includes(id));
    return [...reserved, ...userOrder];
  }, [columnOrderState, enableRowSelection, enableRowPinning]);

  const handleColumnOrderChange: OnChangeFn<ColumnOrderState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedColumnOrderState) : updaterOrValue;
    setColumnOrderState(next.filter(id => !RESERVED_COLUMN_IDS.includes(id)));
  };

  // Forces the reserved selection/pin columns into `left`, in RESERVED_COLUMN_IDS
  // order; never leaks into the public columnPinning contract (stripped again
  // in the change handler below, via the same RESERVED_COLUMN_IDS list so a
  // future reserved column can't slip through either side by accident).
  const resolvedColumnPinningState = useMemo(() => {
    const userLeft = (columnPinningState.left ?? []).filter(id => !RESERVED_COLUMN_IDS.includes(id));
    const reservedLeft = getActiveReservedColumnIds({ enableRowSelection, enableRowPinning });
    const left = [...reservedLeft, ...userLeft];
    const right = (columnPinningState.right ?? []).filter(id => !RESERVED_COLUMN_IDS.includes(id));
    return { left, right };
  }, [columnPinningState, enableRowSelection, enableRowPinning]);

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
      ...buildReservedColumns<T>({ enableRowSelection, enableRowPinning }),
      ...columnGenerator(columns, {
        enableSorting,
        enableColumnFilter,
        enableColumnPinning,
        enableGrouping,
        enableColumnResizing,
        hasDetailPanel,
        hasExpandableRows: tableHasExpandableRows,
        tableId,
      }),
    ],
    [
      columns,
      enableSorting,
      enableRowSelection,
      enableRowPinning,
      enableColumnFilter,
      enableColumnPinning,
      enableGrouping,
      enableColumnResizing,
      hasDetailPanel,
      tableHasExpandableRows,
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
      manualPagination,
      rowCount,
      rowKey,
      enableRowSelection,
      rowSelectionState,
      onRowSelectionChange: handleRowSelectionChange,
      enableColumnFilter,
      columnFiltersState,
      onColumnFiltersChange: handleColumnFiltersChange,
      manualFiltering,
      enableColumnReordering,
      columnOrderState: resolvedColumnOrderState,
      onColumnOrderChange: handleColumnOrderChange,
      enableColumnResizing,
      columnSizingState,
      onColumnSizingChange: setColumnSizingState,
      enableColumnPinning,
      columnPinningState: resolvedColumnPinningState,
      onColumnPinningChange: handleColumnPinningChange,
      hasReservedPinning: Boolean(enableRowSelection || enableRowPinning),
      enableGrouping,
      groupingState,
      onGroupingChange: setGroupingState,
      expandedState: resolvedExpandedState,
      onExpandedChange: handleExpandedChange,
      getRowCanExpand: resolvedGetRowCanExpand,
      enableRowPinning,
      rowPinningState: resolvedRowPinningState,
      onRowPinningChange: handleRowPinningChange,
    }),
  );

  const [pinAnnouncement, setPinAnnouncement] = useState('');
  const [rowPinAnnouncement, setRowPinAnnouncement] = useState('');
  const [reorderAnnouncement, setReorderAnnouncement] = useState('');
  const [resizeAnnouncement, setResizeAnnouncement] = useState('');

  const sortAnnouncement = useMemo(() => {
    if (!enableSorting) return null;
    // Doubles as the "cleared" announcement: silent on mount (live regions
    // don't announce initial content), read out once a sort is removed.
    if (sortingState.length === 0) return 'Sorting cleared.';
    const sort = sortingState[0];
    const label = sort.desc ? 'sorted descending' : 'sorted ascending';
    // `columnDef.header` is set to the column's title (a string) by columnGenerator.
    const header = table.getColumn(sort.id)?.columnDef.header;
    const name = typeof header === 'string' ? header : sort.id;
    return `${name} ${label}`;
  }, [sortingState, table, enableSorting]);

  const filterAnnouncement = useMemo(() => {
    if (!enableColumnFilter) return null;
    // Silent on mount, read on clear (like in `sortAnnouncement`)
    if (columnFiltersState.length === 0) return 'Filter cleared.';
    const matchCount = table.getFilteredRowModel().rows.length;
    return `${matchCount} matching row${matchCount === 1 ? '' : 's'}.`;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resolvedData isn't read directly, but getFilteredRowModel() reads live off it
  }, [columnFiltersState, table, enableColumnFilter, resolvedData]);

  const groupAnnouncement = useMemo(() => {
    if (!enableGrouping) return null;
    // Silent on mount, read on clear (like in `sortAnnouncement`)
    if (groupingState.length === 0) return 'Grouping cleared.';
    const columnId = groupingState[0];
    const header = table.getColumn(columnId)?.columnDef.header;
    const name = typeof header === 'string' ? header : columnId;
    return `Grouped by ${name}.`;
  }, [groupingState, table, enableGrouping]);

  const loadingAnnouncement = loading ? 'Loading data…' : 'Data loaded.';

  const sensors = useSensors(
    useSensor(MouseSensor, EMPTY_SENSOR_OPTIONS),
    useSensor(TouchSensor, EMPTY_SENSOR_OPTIONS),
    useSensor(KeyboardSensor, EMPTY_SENSOR_OPTIONS),
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const nextOrder = moveColumnTo(table, String(active.id), String(over.id));
    if (nextOrder) table.setColumnOrder(nextOrder);
  };
  const dndAccessibility = useMemo(
    () => ({ announcements: buildReorderAnnouncements(table, text => setReorderAnnouncement(text)) }),
    [table],
  );

  // Check if any data exists before pagination
  const hasRowData = table.getPrePaginationRowModel().rows.length > 0;

  // `getVisibleLeafColumns()` is TanStack-memoized (stable reference until the
  // column set/order/pinning actually changes), so deriving from it keeps the
  // <colgroup> and total width from being rebuilt on every unrelated re-render.
  // That memo isn't keyed on sizing, though — `column.getSize()`'s return value
  // can change (drag, keyboard, or a controlled columnSizing prop) with no
  // change in the columns array itself, so columnSizingState is added below
  // purely to force a recompute when a resize actually happens.
  const visibleLeafColumns = table.getVisibleLeafColumns();
  const totalSize = useMemo(
    () => visibleLeafColumns.reduce((sum, column) => sum + column.getSize(), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnSizingState isn't read directly, but column.getSize() reads live off it.
    [visibleLeafColumns, columnSizingState],
  );
  const tableWidth = `${totalSize}px`;

  // `column.getSize()` is a live lookup against the table's sizing state (these columns), otherwise states could be different in different calls.
  const colgroupColumns = useMemo(
    () => visibleLeafColumns.map(column => <col key={column.id} style={{ width: column.getSize() }} />),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnSizingState isn't read directly, but column.getSize() reads live off it.
    [visibleLeafColumns, columnSizingState],
  );

  // Computed once per render and stored instead of per per header cell/menu instance
  const reorderInfo = useMemo(
    () => getReorderInfo(table),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resolvedColumnPinningState/resolvedColumnOrderState aren't read directly, but getIsPinned()/getHeaderGroups() read live off them.
    [table, resolvedColumnPinningState, resolvedColumnOrderState, enableRowSelection, enableRowPinning],
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
      loading,
      loadingStateProps,
      enableColumnPinning,
      onPinAnnouncement: setPinAnnouncement,
      onRowPinAnnouncement: setRowPinAnnouncement,
      enableColumnReordering,
      onReorderAnnouncement: setReorderAnnouncement,
      reorderInfo,
      onResizeAnnouncement: setResizeAnnouncement,
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
      loading,
      loadingStateProps,
      enableColumnPinning,
      enableColumnReordering,
      reorderInfo,
      renderDetailPanel,
    ],
  );

  const styles = advancedTableStyles({ bordered, fillContainer, tableLayout });

  const tableElement = (
    <table
      aria-busy={loading}
      aria-labelledby={ariaLabelledBy}
      className={styles.table()}
      id={tableId}
      style={{ width: tableWidth }}
    >
      {caption ? (
        <AdvancedTableCaption
          hasGrouping={Boolean(enableGrouping)}
          hasSorting={enableSorting}
          showCaption={showCaption}
          title={caption}
        />
      ) : null}
      <colgroup>{colgroupColumns}</colgroup>
      <AdvancedTableHead />
      <AdvancedTableBody />
    </table>
  );

  // We need to conditionally render DnD or the buttons will still have accessibility attributes
  const resolvedTableElement = enableColumnReordering ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={DND_MODIFIERS}
      onDragEnd={handleDragEnd}
      accessibility={dndAccessibility}
    >
      <SortableContext items={reorderInfo.ids} strategy={horizontalListSortingStrategy}>
        {tableElement}
      </SortableContext>
    </DndContext>
  ) : (
    tableElement
  );

  return (
    <AdvancedTableProvider value={contextValue as AdvancedTableContextValue<unknown>}>
      <div className={styles.root()}>
        <div className={styles.container()}>
          {resolvedTableElement}
          {loading && hasRowData && (
            <div className={styles.overlay()}>
              <AdvancedTableLoadingState {...loadingStateProps} />
            </div>
          )}
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
        {enableRowPinning && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {rowPinAnnouncement}
          </div>
        )}
        {enableGrouping && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {groupAnnouncement}
          </div>
        )}
        {enableColumnReordering && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {reorderAnnouncement}
          </div>
        )}
        {enableColumnResizing && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {resizeAnnouncement}
          </div>
        )}
        <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
          {loadingAnnouncement}
        </div>
      </div>
    </AdvancedTableProvider>
  );
}

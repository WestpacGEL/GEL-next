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
  collectRowIds,
  columnGenerator,
  expandedStateToIds,
  expandPinnedRowIds,
  getActiveReservedColumnIds,
  getColumnMeta,
  getReorderInfo,
  hasExpandableRows,
  idsToExpandedState,
  idsToSelectionState,
  isPercentWidthColumn,
  moveColumnTo,
  normalizeRowSelection,
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
  'aria-labelledby': ariaLabelledBy,
  background,
  bordered,
  caption,
  columnFilters: columnFiltersProp,
  columnOrder: columnOrderProp,
  columnPinning: columnPinningProp,
  columns,
  columnSizing: columnSizingProp,
  data,
  defaultColumnFilters: defaultColumnFiltersProp,
  defaultColumnOrder: defaultColumnOrderProp,
  defaultColumnPinning: defaultColumnPinningProp,
  defaultColumnSizing: defaultColumnSizingProp,
  defaultData,
  defaultExpanded: defaultExpandedProp,
  defaultGrouping: defaultGroupingProp,
  defaultPagination: defaultPaginationProp,
  defaultPinnedRows: defaultPinnedRowsProp,
  defaultSelectedRows: defaultSelectedRowsProp,
  defaultSorting: defaultSortingProp,
  emptyState,
  enableColumnFilter,
  enableColumnPinning,
  enableColumnReordering,
  enableColumnResizing,
  enableGrouping,
  enablePagination = true,
  enableRowPinning,
  enableRowSelection,
  enableSorting,
  expanded: expandedProp,
  fillContainer,
  getRowCanExpand,
  grouping: groupingProp,
  id,
  loading = false,
  loadingStateProps,
  manualFiltering,
  manualPagination,
  manualSorting,
  onColumnFiltersChange: onColumnFiltersChangeProp,
  onColumnOrderChange: onColumnOrderChangeProp,
  onColumnPinningChange: onColumnPinningChangeProp,
  onColumnSizingChange: onColumnSizingChangeProp,
  onExpandedChange: onExpandedChangeProp,
  onGroupingChange: onGroupingChangeProp,
  onPaginationChange: onPaginationChangeProp,
  onPinnedRowsChange: onPinnedRowsChangeProp,
  onSelectionChange: onSelectionChangeProp,
  onSortingChange: onSortingChangeProp,
  padding,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  pagination: paginationProp,
  pinnedRows: pinnedRowsProp,
  renderDetailPanel,
  rowCount,
  rowKey,
  selectedRows: selectedRowsProp,
  showCaption,
  sorting: sortingProp,
  tableLayout = 'fixed',
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

  const [expandedState, setExpandedState] = useControlledState<AdvancedTableExpandedState>(
    expandedProp,
    // If there are already grouped states, they are expanded by default
    defaultExpandedProp ?? (enableGrouping ? true : EMPTY_EXPANDED),
    onExpandedChangeProp,
  );

  const [pinnedRowIds, setPinnedRowIds] = useControlledState<AdvancedTablePinnedRowsState>(
    pinnedRowsProp,
    defaultPinnedRowsProp ?? EMPTY_PINNED_ROWS,
    onPinnedRowsChangeProp,
  );

  // Removes invalid (stale or dropped) row via IDs, so select-all can't read as
  // indeterminate over rows that no longer exist. For row selection and nested rows.
  const validRowIds = useMemo(() => {
    if (!rowKey) return new Set<string>();
    return collectRowIds(resolvedData, rowKey);
  }, [resolvedData, rowKey]);

  const rowSelectionState = useMemo(
    () => idsToSelectionState(selectedRowIds, validRowIds),
    [selectedRowIds, validRowIds],
  );

  // Not filtered against `validRowIds()` like selection is above — expansion ids
  // can include ids TanStack makes up itself (e.g. for grouped rows), which
  // validRowIds wouldn't recognize. See `idsToExpandedState`.
  const resolvedExpandedState = useMemo(() => idsToExpandedState(expandedState), [expandedState]);

  // Controlled -> TanStack: Expands the public, parent-only pinned ids into TanStack's fully-cascaded
  // set (parent + every descendant) by walking `data` directly — see utils/pinned-rows.ts.
  const resolvedRowPinningState = useMemo<RowPinningState>(
    () => ({ top: expandPinnedRowIds(pinnedRowIds, resolvedData, rowKey), bottom: [] }),
    [pinnedRowIds, resolvedData, rowKey],
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelectionState) : updaterOrValue;
    const ids = selectionStateToIds(next);
    setSelectedRowIds(rowKey ? normalizeRowSelection(ids, resolvedData, rowKey) : ids);
  };

  const handleExpandedChange: OnChangeFn<ExpandedState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedExpandedState) : updaterOrValue;
    setExpandedState(expandedStateToIds(next));
  };

  const handleRowPinningChange: OnChangeFn<RowPinningState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedRowPinningState) : updaterOrValue;
    setPinnedRowIds(collapsePinnedRowIds(next.top ?? [], resolvedData, rowKey));
  };

  // TanStack types filter `value` as `unknown`; the public contract narrows it
  // to `string`, so the updater is resolved here rather than passed straight
  // through like sorting's setter.
  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = updaterOrValue => {
    const current: ColumnFiltersState = columnFiltersState;
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue;
    setColumnFiltersState(next.map(filter => ({ id: filter.id, value: String(filter.value) })));
  };

  const handleColumnOrderChange: OnChangeFn<ColumnOrderState> = updaterOrValue => {
    const next = typeof updaterOrValue === 'function' ? updaterOrValue(resolvedColumnOrderState) : updaterOrValue;
    setColumnOrderState(next.filter(id => !RESERVED_COLUMN_IDS.includes(id)));
  };

  // Overwrite: TanStack's own default `getRowCanExpand` only returns true for rows with
  // `subRows` which would block `renderDetailPanel` from ever opening the panel.
  const resolvedGetRowCanExpand = useMemo<((row: Row<T>) => boolean) | undefined>(() => {
    if (getRowCanExpand) return row => getRowCanExpand(row.original, { depth: row.depth });
    if (renderDetailPanel) return () => true;
    return undefined;
  }, [getRowCanExpand, renderDetailPanel]);

  // Flag for whether the first data column needs to reserves space for the expand toggle button.
  const tableHasExpandableRows = useMemo(
    () => hasExpandableRows(resolvedData, getRowCanExpand, Boolean(renderDetailPanel)),
    [resolvedData, getRowCanExpand, renderDetailPanel],
  );

  // Forces the reserved selection/pin columns to the front so a controlled `columnOrder` can never set them out of place.
  const resolvedColumnOrderState = useMemo(() => {
    const reserved = getActiveReservedColumnIds({ enableRowSelection, enableRowPinning });
    const userOrder = columnOrderState.filter(id => !RESERVED_COLUMN_IDS.includes(id));
    return [...reserved, ...userOrder];
  }, [columnOrderState, enableRowSelection, enableRowPinning]);

  // Forces the reserved selection/pin columns into `left`
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
        enableColumnFilter,
        enableColumnPinning,
        enableColumnResizing,
        enableGrouping,
        enableSorting,
        hasDetailPanel,
        hasExpandableRows: tableHasExpandableRows,
        tableId,
      }),
    ],
    [
      columns,
      enableColumnFilter,
      enableColumnPinning,
      enableColumnResizing,
      enableGrouping,
      enableRowPinning,
      enableRowSelection,
      enableSorting,
      hasDetailPanel,
      tableHasExpandableRows,
      tableId,
    ],
  );

  const table = useReactTable<T>(
    buildTableOptions<T>({
      columnFiltersState,
      columnOrderState: resolvedColumnOrderState,
      columnPinningState: resolvedColumnPinningState,
      columns: tableColumns,
      columnSizingState,
      data: resolvedData,
      enableColumnFilter,
      enableColumnPinning,
      enableColumnReordering,
      enableColumnResizing,
      enableGrouping,
      enablePagination,
      enableRowPinning,
      enableRowSelection,
      enableSorting,
      expandedState: resolvedExpandedState,
      getRowCanExpand: resolvedGetRowCanExpand,
      groupingState,
      hasReservedPinning: Boolean(enableRowSelection || enableRowPinning),
      manualFiltering,
      manualPagination,
      manualSorting,
      onColumnFiltersChange: handleColumnFiltersChange,
      onColumnOrderChange: handleColumnOrderChange,
      onColumnPinningChange: handleColumnPinningChange,
      onColumnSizingChange: setColumnSizingState,
      onExpandedChange: handleExpandedChange,
      onGroupingChange: setGroupingState,
      onPaginationChange: setPaginationState,
      onRowPinningChange: handleRowPinningChange,
      onRowSelectionChange: handleRowSelectionChange,
      onSortingChange: setSortingState,
      paginationState,
      rowCount,
      rowKey,
      rowPinningState: resolvedRowPinningState,
      rowSelectionState,
      sortingState,
      tableId,
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

  // Check if any data exists before pagination, provided for context
  const hasRowData = table.getPrePaginationRowModel().rows.length > 0;

  const visibleLeafColumns = table.getVisibleLeafColumns();
  // A percentage-width column (`meta.width` is a string) never enters TanStack's
  // numeric sizing state, so it contributes nothing to the pixel sum below —
  // the table's own width relies on `fillContainer` to resolve the rest.
  const totalSize = useMemo(
    () => visibleLeafColumns.reduce((sum, column) => sum + (isPercentWidthColumn(column) ? 0 : column.getSize()), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnSizingState isn't read directly, but column.getSize() reads live off it.
    [visibleLeafColumns, columnSizingState],
  );
  const tableWidth = `${totalSize}px`;

  // `column.getSize()` is a live lookup against the table's sizing state (these columns), otherwise states could be different in different calls.
  const colgroupColumns = useMemo(
    () =>
      visibleLeafColumns.map(column => (
        <col key={column.id} style={{ width: getColumnMeta(column).width ?? column.getSize() }} />
      )),
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
      background,
      bordered,
      emptyState,
      enableColumnPinning,
      enableColumnReordering,
      loading,
      loadingStateProps,
      onPinAnnouncement: setPinAnnouncement,
      onReorderAnnouncement: setReorderAnnouncement,
      onResizeAnnouncement: setResizeAnnouncement,
      onRowPinAnnouncement: setRowPinAnnouncement,
      padding,
      pageSizeOptions,
      renderDetailPanel,
      reorderInfo,
      table,
      tableId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      background,
      bordered,
      emptyState,
      enableColumnPinning,
      enableColumnReordering,
      loading,
      loadingStateProps,
      padding,
      pageSizeOptionsKey,
      renderDetailPanel,
      reorderInfo,
      table,
      tableId,
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

  // We need to conditionally render DnD or the text cells will still have accessibility attributes
  const resolvedTableElement = enableColumnReordering ? (
    <DndContext
      accessibility={dndAccessibility}
      collisionDetection={closestCenter}
      modifiers={DND_MODIFIERS}
      onDragEnd={handleDragEnd}
      sensors={sensors}
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

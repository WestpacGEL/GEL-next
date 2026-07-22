import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  OnChangeFn,
  PaginationState,
  Row,
  RowPinningState,
  RowSelectionState,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';

import {
  AdvancedTableColumnFiltersState,
  AdvancedTablePaginationState,
  AdvancedTableRowKey,
  AdvancedTableSortingState,
} from '../advanced-table.types.js';

import { resolveRowId } from './row-id.js';

/** Inputs the component derives (state, ids, resolved flags) for `useReactTable`. */
export type BuildTableOptionsParams<T> = {
  /** Current column-filter state. */
  columnFiltersState: AdvancedTableColumnFiltersState;
  /** Current column-order state (already resolved to include any forced reserved column ids). */
  columnOrderState: ColumnOrderState;
  /** Current column-pinning state (already resolved, including any forced reserved column id). */
  columnPinningState: ColumnPinningState;
  /** Current column-sizing state. */
  columnSizingState: ColumnSizingState;
  /** Internal TanStack columns produced by `columnGenerator`. */
  columns: ColumnDef<T>[];
  /** Row data (already resolved from the controlled/uncontrolled pattern). */
  data: T[];
  /** Table-level column-filter flag. */
  enableColumnFilter?: boolean;
  /** Table-level column-pinning flag. */
  enableColumnPinning?: boolean;
  /** Table-level column-reordering flag. */
  enableColumnReordering?: boolean;
  /** Table-level column-resizing flag. */
  enableColumnResizing?: boolean;
  /** Table-level grouping flag. */
  enableGrouping?: boolean;
  /** Table-level pagination flag. */
  enablePagination?: boolean;
  /** Table-level row-pinning flag. */
  enableRowPinning?: boolean;
  /** Table-level row-selection flag. */
  enableRowSelection?: boolean;
  /** Table-level sorting flag. */
  enableSorting?: boolean;
  /** Current expansion state. Always wired. */
  expandedState: ExpandedState;
  /** Optional overrides which rows can expand conditionally. */
  getRowCanExpand?: (row: Row<T>) => boolean;
  /** Current grouping state (0 or 1 column ids — single-column grouping only). */
  groupingState: GroupingState;
  /** `true` when the reserved selection column must be force-pinned regardless of `enableColumnPinning`. */
  hasReservedPinning?: boolean;
  /** Manual filtering (controlled) — the table tracks state but does not filter rows itself. */
  manualFiltering?: boolean;
  /** Manual pagination (controlled) — the table renders `data` as-is instead of slicing it, and only tracks pagination state. */
  manualPagination?: boolean;
  /** Manual sorting (controlled) — the table tracks state but does not reorder. */
  manualSorting?: boolean;
  /** Column-filter setter (TanStack hands it an updater; the setter resolves it). */
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  /** Column-order setter (TanStack hands it an updater; the setter resolves it). */
  onColumnOrderChange: OnChangeFn<ColumnOrderState>;
  /** Column-pinning setter (TanStack hands it an updater; the setter resolves it). */
  onColumnPinningChange: OnChangeFn<ColumnPinningState>;
  /** Column-sizing setter (TanStack hands it an updater; passed straight through — no reserved-id merging needed). */
  onColumnSizingChange: OnChangeFn<ColumnSizingState>;
  /** Expansion setter (TanStack hands it an updater; the setter resolves it). */
  onExpandedChange: OnChangeFn<ExpandedState>;
  /** Grouping setter (TanStack hands it an updater; the setter resolves it). */
  onGroupingChange: OnChangeFn<GroupingState>;
  /** Pagination-state setter (TanStack hands it an updater; the setter resolves it). */
  onPaginationChange: OnChangeFn<PaginationState>;
  /** Row-pinning setter (TanStack hands it an updater; the setter resolves it). */
  onRowPinningChange: OnChangeFn<RowPinningState>;
  /** Row-selection setter (TanStack hands it an updater; the setter resolves it). */
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  /** Sort-state setter (TanStack hands it an updater; the setter resolves it). */
  onSortingChange: OnChangeFn<SortingState>;
  /** Current pagination state. */
  paginationState: AdvancedTablePaginationState;
  /** Total row count across all pages; drives page count, the row-range summary, and Next/Prev when `manualPagination` is set. */
  rowCount?: number;
  /** Row-identity accessor. Drives `getRowId` whenever selection (or a later
   * reserved-column feature) is enabled; falls back to index-based ids otherwise. */
  rowKey?: AdvancedTableRowKey<T>;
  /** Current row-pinning state — already expanded to include cascaded sub-row ids. Top pin only, bottom is not enabled. */
  rowPinningState: RowPinningState;
  /** Current row-selection state, keyed by the id `getRowId` produces. */
  rowSelectionState: RowSelectionState;
  /** Current sort state. */
  sortingState: AdvancedTableSortingState;
  /** Resolved table id; used to namespace generated row ids. */
  tableId: string;
};

// Builds the `state` slice of the `useReactTable` options object.
function buildTableState<T>({
  columnFiltersState,
  columnOrderState,
  columnPinningState,
  columnSizingState,
  enableColumnFilter,
  enableColumnPinning,
  enableColumnReordering,
  enableColumnResizing,
  enableGrouping,
  enablePagination,
  enableRowPinning,
  enableRowSelection,
  enableSorting,
  expandedState,
  groupingState,
  hasReservedPinning,
  paginationState,
  rowPinningState,
  rowSelectionState,
  sortingState,
}: BuildTableOptionsParams<T>): TableOptions<T>['state'] {
  return {
    ...((enableColumnPinning || hasReservedPinning) && { columnPinning: columnPinningState }),
    ...(enableColumnFilter && { columnFilters: columnFiltersState }),
    ...(enableColumnReordering && { columnOrder: columnOrderState }),
    ...(enableColumnResizing && { columnSizing: columnSizingState }),
    ...(enableGrouping && { grouping: groupingState }),
    ...(enablePagination && { pagination: paginationState }),
    ...(enableRowPinning && { rowPinning: rowPinningState }),
    ...(enableRowSelection && { rowSelection: rowSelectionState }),
    ...(enableSorting && { sorting: sortingState }),
    // Unconditional — no `enableExpanding` flag exists; the expand control on a
    // row is gated per-row by `getCanExpand()`/`getIsGrouped()`, not by a table
    // switch (see AdvancedTableExpandedState's doc).
    expanded: expandedState,
  };
}

/**
 * Builds the option object for `useReactTable`. Kept as a pure function (no hooks)
 * so the component call site reads `useReactTable(buildTableOptions({ ... }))` and
 * all the sorting/row-model wiring lives in one place.
 */
export function buildTableOptions<T>(params: BuildTableOptionsParams<T>): TableOptions<T> {
  const {
    columns,
    data,
    enableColumnFilter,
    enableColumnPinning,
    enableColumnReordering,
    enableColumnResizing,
    enableGrouping,
    enablePagination,
    enableRowPinning,
    enableRowSelection,
    enableSorting,
    getRowCanExpand,
    manualFiltering,
    manualPagination,
    manualSorting,
    onColumnFiltersChange,
    onColumnOrderChange,
    onColumnPinningChange,
    onColumnSizingChange,
    onExpandedChange,
    onGroupingChange,
    onPaginationChange,
    onRowPinningChange,
    onRowSelectionChange,
    onSortingChange,
    rowCount,
    rowKey,
    tableId,
  } = params;

  return {
    // Without this, TanStack resets `expanded` to `{}` on its own the moment a
    // row model recomputes (e.g. right after grouping) — same fix as
    // `autoResetPageIndex`, this time for the expansion triple's state.
    autoResetExpanded: false,
    columns,
    data,
    ...(enableSorting
      ? {
          enableMultiSort: false,
          enableSorting: true,
          enableSortingRemoval: true,
          getSortedRowModel: getSortedRowModel(),
          manualSorting,
          onSortingChange,
          // GEL styling choice: always cycle ascending -> descending -> unsorted (TanStack defaults number columns to descending-first).
          sortDescFirst: false,
        }
      : {}),
    ...(enablePagination
      ? {
          // This is a design decision, to be determined if behavior is kept
          autoResetPageIndex: false,
          getPaginationRowModel: getPaginationRowModel(),
          manualPagination,
          onPaginationChange,
          rowCount,
        }
      : {}),
    ...(enableRowSelection
      ? {
          enableRowSelection: row => !row.getIsGrouped(),
          onRowSelectionChange,
        }
      : {}),
    ...(enableRowPinning
      ? {
          // Only root rows and leaves directly under a group banner can pin; deeper sub-rows cascade
          // from their ancestor (pinned-rows.ts). Pinning any row would need TanStack to keep a pin
          // when its ancestor collapses, plus AdvancedTablePinnedRowsState to track non-top-level ids.
          enableRowPinning: row => {
            const parent = row.getParentRow();
            return !row.getIsGrouped() && (!parent || parent.getIsGrouped());
          },
          onRowPinningChange,
        }
      : {}),
    ...(enableColumnFilter
      ? {
          getFilteredRowModel: getFilteredRowModel(),
          manualFiltering,
          onColumnFiltersChange,
        }
      : {}),
    ...(enableColumnReordering
      ? {
          onColumnOrderChange,
        }
      : {}),
    ...(enableColumnResizing
      ? {
          columnResizeMode: 'onChange' as const,
          enableColumnResizing: true,
          onColumnSizingChange,
        }
      : {}),
    ...(enableColumnPinning
      ? {
          enableColumnPinning: true,
          onColumnPinningChange,
        }
      : {}),
    ...(enableGrouping
      ? {
          enableGrouping: true,
          getGroupedRowModel: getGroupedRowModel(),
          groupedColumnMode: false as const,
          onGroupingChange,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowId: rowKey
      ? (row, _index, parent) => {
          const id = resolveRowId(rowKey, row);
          return parent ? `${parent.id}.${id}` : id;
        }
      : (_row, index, parent) => (parent ? `${parent.id}.${index}` : `${tableId}-${index}`),
    // `subRows` is a fixed field-name convention, not a configurable prop. TanStack's
    // `getSubRows` doesn't type well with custom types: https://github.com/TanStack/table/discussions/4484
    getSubRows: row => (row as { subRows?: T[] }).subRows,
    onExpandedChange,
    ...(getRowCanExpand ? { getRowCanExpand } : {}),
    // Keep a row's (or group's) expanded children together on one page rather than splitting them across a pagination boundary.
    paginateExpandedRows: false,
    state: buildTableState(params),
  };
}

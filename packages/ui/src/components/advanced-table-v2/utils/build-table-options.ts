import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
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
  /** Row data (already resolved from the controlled/uncontrolled pattern). */
  data: T[];
  /** Internal TanStack columns produced by `columnGenerator`. */
  columns: ColumnDef<T>[];
  /** Resolved table id; used to namespace generated row ids. */
  tableId: string;
  /** Table-level sorting flag. */
  enableSorting?: boolean;
  /** Current sort state. */
  sortingState: AdvancedTableSortingState;
  /** Sort-state setter (TanStack hands it an updater; the setter resolves it). */
  onSortingChange: OnChangeFn<SortingState>;
  /** Manual (server-side) sorting — the table tracks state but does not reorder. */
  manualSorting?: boolean;
  /** Table-level pagination flag. */
  enablePagination?: boolean;
  /** Current pagination state. */
  paginationState: AdvancedTablePaginationState;
  /** Pagination-state setter (TanStack hands it an updater; the setter resolves it). */
  onPaginationChange: OnChangeFn<PaginationState>;
  /** Table-level column-filter flag. */
  enableColumnFilter?: boolean;
  /** Current column-filter state. */
  columnFiltersState: AdvancedTableColumnFiltersState;
  /** Column-filter setter (TanStack hands it an updater; the setter resolves it). */
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  /** Manual (server-side) filtering — the table tracks state but does not filter rows itself. */
  manualFiltering?: boolean;
  /** Table-level column-pinning flag. Gates `column.getCanPin()`/`column.pin()`. */
  enableColumnPinning?: boolean;
  /** Current column-pinning state (already resolved, including any forced reserved column id). */
  columnPinningState: ColumnPinningState;
  /** Column-pinning setter (TanStack hands it an updater; the setter resolves it). */
  onColumnPinningChange: OnChangeFn<ColumnPinningState>;
  /** `true` when the reserved selection column must be force-pinned regardless of `enableColumnPinning`. */
  hasReservedPinning?: boolean;
  /** Table-level grouping flag. Gates `column.getCanGroup()`. */
  enableGrouping?: boolean;
  /** Current grouping state (0 or 1 column ids — single-column grouping only). */
  groupingState: GroupingState;
  /** Grouping setter (TanStack hands it an updater; the setter resolves it). */
  onGroupingChange: OnChangeFn<GroupingState>;
  /** Row-identity accessor. Drives `getRowId` whenever selection (or a later
   * reserved-column feature) is enabled; falls back to index-based ids otherwise. */
  rowKey?: AdvancedTableRowKey<T>;
  /** Table-level row-selection flag. */
  enableRowSelection?: boolean;
  /** Current row-selection state, keyed by the id `getRowId` produces. */
  rowSelectionState: RowSelectionState;
  /** Row-selection setter (TanStack hands it an updater; the setter resolves it). */
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  /** Current expansion state. Always wired (no `enableExpanding` flag — see
   * advanced-table.types.ts's `AdvancedTableExpandedState` doc). */
  expandedState: ExpandedState;
  /** Expansion setter (TanStack hands it an updater; the setter resolves it). */
  onExpandedChange: OnChangeFn<ExpandedState>;
  /**
   * Overrides which rows can expand. Resolved by the component from the public
   * `getRowCanExpand`/`renderDetailPanel` props — `undefined` lets TanStack's own
   * `subRows`-based default apply.
   */
  getRowCanExpand?: (row: Row<T>) => boolean;
  /** Table-level row-pinning flag. */
  enableRowPinning?: boolean;
  /** Current row-pinning state — already expanded to include cascaded sub-row ids. Top only; `bottom` is always `[]`. */
  rowPinningState: RowPinningState;
  /** Row-pinning setter (TanStack hands it an updater; the setter resolves it). */
  onRowPinningChange: OnChangeFn<RowPinningState>;
};

// Builds the `state` slice of the `useReactTable` options object.
function buildTableState<T>({
  enableSorting,
  sortingState,
  enablePagination,
  paginationState,
  enableRowSelection,
  rowSelectionState,
  enableColumnFilter,
  columnFiltersState,
  enableColumnPinning,
  columnPinningState,
  hasReservedPinning,
  enableGrouping,
  groupingState,
  enableRowPinning,
  rowPinningState,
  expandedState,
}: BuildTableOptionsParams<T>): TableOptions<T>['state'] {
  return {
    ...(enableSorting && { sorting: sortingState }),
    ...(enablePagination && { pagination: paginationState }),
    ...(enableRowSelection && { rowSelection: rowSelectionState }),
    ...(enableColumnFilter && { columnFilters: columnFiltersState }),
    ...((enableColumnPinning || hasReservedPinning) && { columnPinning: columnPinningState }),
    ...(enableGrouping && { grouping: groupingState }),
    ...(enableRowPinning && { rowPinning: rowPinningState }),
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
    data,
    columns,
    tableId,
    enableSorting,
    onSortingChange,
    manualSorting,
    enablePagination,
    onPaginationChange,
    rowKey,
    enableRowSelection,
    onRowSelectionChange,
    onExpandedChange,
    getRowCanExpand,
    enableColumnFilter,
    onColumnFiltersChange,
    manualFiltering,
    enableColumnPinning,
    onColumnPinningChange,
    enableGrouping,
    onGroupingChange,
    enableRowPinning,
    onRowPinningChange,
  } = params;
  return {
    data,
    columns,
    state: buildTableState(params),
    ...(enableSorting
      ? {
          enableMultiSort: false,
          enableSortingRemoval: true,
          // Always cycle ascending -> descending -> unsorted (TanStack defaults number columns to descending-first).
          sortDescFirst: false,
          enableSorting: true,
          getSortedRowModel: getSortedRowModel(),
          onSortingChange,
          manualSorting,
        }
      : {}),
    ...(enablePagination
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          onPaginationChange,
          // The pagination triple owns the page index, so opt out of TanStack's
          // automatic reset: a controlled or seeded `pageIndex` must not be
          // clobbered when `data` updates. (Resolves the reconciled-spec TODO.)
          // TODO: Verify this is the intended design (should be an option?)
          autoResetPageIndex: false,
        }
      : {}),
    // A function (not `true`) so synthetic group-header rows — which render no
    // checkbox at all — can never end up selected via select-all and leak a
    // non-`rowKey` id into the public `onSelectionChange` contract.
    ...(enableRowSelection ? { enableRowSelection: row => !row.getIsGrouped(), onRowSelectionChange } : {}),
    ...(enableRowPinning
      ? {
          // A function (not `true`): group-header rows render as a single
          // full-width banner with no pin-toggle control, so this blocks them
          // from being pinned via any other code path too.
          enableRowPinning: row => !row.getIsGrouped(),
          onRowPinningChange,
        }
      : {}),
    ...(enableColumnFilter
      ? { getFilteredRowModel: getFilteredRowModel(), onColumnFiltersChange, manualFiltering }
      : {}),
    ...(enableColumnPinning ? { enableColumnPinning: true, onColumnPinningChange } : {}),
    ...(enableGrouping
      ? {
          enableGrouping: true,
          getGroupedRowModel: getGroupedRowModel(),
          groupedColumnMode: false as const,
          onGroupingChange,
        }
      : {}),
    // `subRows` is a fixed field-name convention, not a configurable prop. TanStack's
    // `getSubRows` doesn't type well with custom types: https://github.com/TanStack/table/discussions/4484
    getSubRows: row => (row as { subRows?: T[] }).subRows,
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange,
    ...(getRowCanExpand ? { getRowCanExpand } : {}),
    // Without this, TanStack resets `expanded` to `{}` on its own the moment a
    // row model recomputes (e.g. right after grouping) — same fix as
    // `autoResetPageIndex` above, this time for the expansion triple's state.
    autoResetExpanded: false,
    // Keep a row's (or group's) expanded children together on one page rather
    // than splitting them across a pagination boundary.
    paginateExpandedRows: false,
    getCoreRowModel: getCoreRowModel(),
    getRowId: rowKey
      ? (row, _index, parent) => {
          const id = resolveRowId(rowKey, row);
          return parent ? `${parent.id}.${id}` : id;
        }
      : (_row, index, parent) => (parent ? `${parent.id}.${index}` : `${tableId}-${index}`),
  };
}

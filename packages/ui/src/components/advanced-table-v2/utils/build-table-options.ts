import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
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
  /** Row-identity accessor. Drives `getRowId` whenever selection (or a later
   * reserved-column feature) is enabled; falls back to index-based ids otherwise. */
  rowKey?: AdvancedTableRowKey<T>;
  /** Table-level row-selection flag. */
  enableRowSelection?: boolean;
  /** Current row-selection state, keyed by the id `getRowId` produces. */
  rowSelectionState: RowSelectionState;
  /** Row-selection setter (TanStack hands it an updater; the setter resolves it). */
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
};

/**
 * Builds the option object for `useReactTable`. Kept as a pure function (no hooks)
 * so the component call site reads `useReactTable(buildTableOptions({ ... }))` and
 * all the sorting/row-model wiring lives in one place.
 */
export function buildTableOptions<T>({
  data,
  columns,
  tableId,
  enableSorting,
  sortingState,
  onSortingChange,
  manualSorting,
  enablePagination,
  paginationState,
  onPaginationChange,
  rowKey,
  enableRowSelection,
  rowSelectionState,
  onRowSelectionChange,
  enableColumnFilter,
  columnFiltersState,
  onColumnFiltersChange,
  manualFiltering,
}: BuildTableOptionsParams<T>): TableOptions<T> {
  return {
    data,
    columns,
    state: {
      ...(enableSorting && { sorting: sortingState }),
      ...(enablePagination && { pagination: paginationState }),
      ...(enableRowSelection && { rowSelection: rowSelectionState }),
      ...(enableColumnFilter && { columnFilters: columnFiltersState }),
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
    ...(enableRowSelection ? { enableRowSelection: true, onRowSelectionChange } : {}),
    ...(enableColumnFilter
      ? { getFilteredRowModel: getFilteredRowModel(), onColumnFiltersChange, manualFiltering }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getRowId: rowKey
      ? (row, _index, parent) => {
          const id = resolveRowId(rowKey, row);
          return parent ? `${parent.id}.${id}` : id;
        }
      : (_row, index, parent) => (parent ? `${parent.id}.${index}` : `${tableId}-${index}`),
  };
}

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';

import { AdvancedTableSortingState } from '../advanced-table.types.js';

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
}: BuildTableOptionsParams<T>): TableOptions<T> {
  return {
    data,
    columns,
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
          onSortingChange,
          manualSorting,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (_row, index, parent) => (parent ? `${parent.id}.${index}` : `${tableId}-${index}`),
  };
}

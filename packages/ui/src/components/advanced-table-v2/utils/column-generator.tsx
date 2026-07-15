import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { AdvancedTableColumn, AdvancedTableGroupColumn } from '../advanced-table.types.js';

function isGroupColumn<T>(column: AdvancedTableColumn<T>): column is AdvancedTableGroupColumn<T> {
  return 'columns' in column && Array.isArray(column.columns);
}

/** Options resolving table-level feature flags down onto each generated column. */
type ColumnGeneratorOptions = {
  /** Table-level sorting flag; a column may opt out with its own `enableSorting: false`. */
  enableSorting?: boolean;
  /** Table-level filtering flag; a column may opt out with its own `enableColumnFilter: false`. */
  enableColumnFilter?: boolean;
  /** Table-level pinning flag. Uniform across every leaf column — no per-column opt-out. */
  enableColumnPinning?: boolean;
};

/**
 * Maps the GEL-owned {@link AdvancedTableColumn} shape onto internal TanStack
 * `ColumnDef`s. This is the only place the two representations meet — TanStack
 * types never surface in the public API.
 */
export function columnGenerator<T>(
  columns: AdvancedTableColumn<T>[],
  options: ColumnGeneratorOptions = {},
): ColumnDef<T>[] {
  return columns.map((column): ColumnDef<T> => {
    if (isGroupColumn(column)) {
      return {
        id: column.key,
        header: column.title,
        columns: columnGenerator(column.columns, options),
        enableGrouping: false,
        enablePinning: false,
      };
    }

    // The leaf column is a distributive union over `keyof T`; widen `render` for the
    // internal call site (the public type still infers the value from `key`).
    const render = column.render as ((value: unknown, row: T) => ReactNode) | undefined;

    return {
      id: String(column.key),
      accessorKey: column.key as string,
      header: column.title,
      cell: info => (render ? render(info.getValue(), info.row.original) : (info.getValue() as ReactNode)),
      // Sorting is enabled only at the table level; a column may opt out with `false`
      // but cannot enable sorting on its own.
      enableSorting: options.enableSorting ? (column.enableSorting ?? true) : false,
      // Filtering is enabled only at the table level; a column may opt out with `false`
      // but cannot enable filtering on its own.
      enableColumnFilter: options.enableColumnFilter ? (column.enableColumnFilter ?? true) : false,
      // No per-column opt-out for pinning — table-level `enableColumnPinning` applies uniformly.
      enablePinning: Boolean(options.enableColumnPinning),
      ...(column.width !== undefined ? { size: column.width } : {}),
    };
  });
}

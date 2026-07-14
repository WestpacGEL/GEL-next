import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { AdvancedTableColumn, AdvancedTableGroupColumn } from '../advanced-table.types.js';

function isGroupColumn<T>(column: AdvancedTableColumn<T>): column is AdvancedTableGroupColumn<T> {
  return 'columns' in column && Array.isArray(column.columns);
}

/**
 * Maps the GEL-owned {@link AdvancedTableColumn} shape onto internal TanStack
 * `ColumnDef`s. This is the only place the two representations meet — TanStack
 * types never surface in the public API.
 */
export function columnGenerator<T>(columns: AdvancedTableColumn<T>[]): ColumnDef<T>[] {
  return columns.map((column): ColumnDef<T> => {
    if (isGroupColumn(column)) {
      return {
        id: column.key,
        header: column.title,
        columns: columnGenerator(column.columns),
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
      ...(column.width !== undefined ? { size: column.width } : {}),
    };
  });
}

import { Column, Header } from '@tanstack/react-table';

import { ColumnReorderInfo } from '../advanced-table.context.js';

import { RESERVED_COLUMN_IDS } from './reserved-columns.js';

// Pin, group and resize columns all check if the column is in the reserved list (pin and collapse) to
// exclude adding action menu items (non-data elements).

export function canPinColumn<T>(column: Column<T, unknown>): boolean {
  return column.getCanPin() && Boolean(column.accessorFn) && !RESERVED_COLUMN_IDS.includes(column.id);
}

export function canGroupColumn<T>(column: Column<T, unknown>): boolean {
  return column.getCanGroup() && !RESERVED_COLUMN_IDS.includes(column.id);
}

/** Only the top header row's real (non-placeholder) cells are re-orderable — a nested/grouped
 * leaf header is never itself a reorderable unit (its group is, via `reorderInfo`). */
export function canReorderColumn<T>(
  header: Header<T, unknown>,
  reorderInfo: ColumnReorderInfo,
  enableColumnReordering: boolean | undefined,
): boolean {
  const isTopRow = header.headerGroup.depth === 0;
  return (
    Boolean(enableColumnReordering) && isTopRow && !header.isPlaceholder && reorderInfo.idSet.has(header.column.id)
  );
}

/** Reserved columns (select/expand) never go through `columnGenerator`, so `meta` is undefined for them. */
export function getColumnMeta<T>(column: Column<T, unknown>) {
  return column.columnDef.meta ?? {};
}

/** True when this column's configured width is a percentage string, not a pixel number. It is stored in the meta (not in TanStack). */
export function isPercentWidthColumn<T>(column: Column<T, unknown>): boolean {
  return Boolean(getColumnMeta(column).width);
}

/**
 * Pinned columns are excluded too: resizing a pinned column isn't supported.
 * Percentage-width columns are excluded: their width never enters TanStack's resizable
 * sizing state, so a resize handle would render but have no visible effect.
 * */
export function canResizeColumn<T>(column: Column<T, unknown>): boolean {
  return (
    column.getCanResize() &&
    Boolean(column.accessorFn) &&
    !RESERVED_COLUMN_IDS.includes(column.id) &&
    !column.getIsPinned() &&
    !isPercentWidthColumn(column)
  );
}

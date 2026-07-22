import { Column } from '@tanstack/react-table';

import { RESERVED_COLUMN_IDS } from './reserved-columns.js';

// `getCanPin()`/`getCanGroup()`/`getCanResize()` all check a group/banding
// column's LEAF children, never the group column's own `enableX: false` —
// `accessorFn` is only present on real (leaf) data columns, so it's what
// actually excludes banding headers from pin/resize (grouping needs no such
// check since a group header is never itself groupable).

export function canPinColumn<T>(column: Column<T, unknown>): boolean {
  return column.getCanPin() && Boolean(column.accessorFn) && !RESERVED_COLUMN_IDS.includes(column.id);
}

export function canGroupColumn<T>(column: Column<T, unknown>): boolean {
  return column.getCanGroup() && !RESERVED_COLUMN_IDS.includes(column.id);
}

/** Pinned columns are excluded too: resizing a pinned column isn't supported yet. */
export function canResizeColumn<T>(column: Column<T, unknown>): boolean {
  return (
    column.getCanResize() &&
    Boolean(column.accessorFn) &&
    !RESERVED_COLUMN_IDS.includes(column.id) &&
    !column.getIsPinned()
  );
}

/** Reserved columns (select/expand) never go through `columnGenerator`, so `meta` is undefined for them. */
export function getColumnMeta<T>(column: Column<T, unknown>) {
  return column.columnDef.meta ?? {};
}

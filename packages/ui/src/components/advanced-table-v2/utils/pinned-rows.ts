import { AdvancedTableRowKey } from '../advanced-table.types.js';

import { resolveRowId } from './row-id.js';

type RowWithSubRows<T> = T & { subRows?: RowWithSubRows<T>[] };

/**
 * Computes the same composite id TanStack's row model actually assigns to a
 * row — matching `getRowId` in build-table-options.ts: a top-level row's id
 * is its own `rowKey`-derived value; a descendant's id is prefixed with its
 * parent's (already-composite) id, joined by `.`. Pinned ids fed into
 * TanStack's `state.rowPinning` must be in this exact form, or `getTopRows()`
 * fails to resolve sub-row ids (`getRow could not find row with ID: ...`).
 */
function compositeRowId<T>(rowKey: AdvancedTableRowKey<T>, row: T, parentId: string | undefined): string {
  const ownId = resolveRowId(rowKey, row);
  return parentId ? `${parentId}.${ownId}` : ownId;
}

/**
 * Expands the public, parent-only pinned ids into the full cascaded set
 * TanStack's row-pinning state needs (parent + every descendant at every
 * depth, using TanStack's own composite id format), by walking `subRows`
 * directly off `data` — never the TanStack `table` instance, which doesn't
 * exist yet at the point this is called (its `state.rowPinning` option is
 * itself derived from this function's output, so going through `table` here
 * would be circular).
 */
export function expandPinnedRowIds<T>(pinnedIds: string[], data: T[], rowKey?: AdvancedTableRowKey<T>): string[] {
  if (!rowKey || pinnedIds.length === 0) return [];
  const pinned = new Set(pinnedIds);
  const expanded: string[] = [];

  const walk = (rows: RowWithSubRows<T>[], parentId: string | undefined, ancestorPinned: boolean) => {
    for (const row of rows) {
      const id = compositeRowId(rowKey, row, parentId);
      // The public contract only ever lists top-level ids (no parent prefix),
      // so a row's own id only needs checking against `pinned` at the top
      // level — at any deeper level, only cascading from an ancestor pins it.
      const isPinned = ancestorPinned || (parentId === undefined && pinned.has(id));
      if (isPinned) expanded.push(id);
      if (row.subRows) walk(row.subRows, id, isPinned);
    }
  };

  walk(data as RowWithSubRows<T>[], undefined, false);
  return expanded;
}

/**
 * Collapses TanStack's cascaded row-pinning ids (parent + every descendant,
 * in TanStack's composite id format) back down to the public, parent-only
 * contract: only a top-level row's own (unprefixed) id is ever reported.
 */
export function collapsePinnedRowIds<T>(ids: string[], data: T[], rowKey?: AdvancedTableRowKey<T>): string[] {
  if (!rowKey || ids.length === 0) return [];
  const idSet = new Set(ids);
  const roots: string[] = [];

  const walk = (rows: RowWithSubRows<T>[], parentId: string | undefined) => {
    for (const row of rows) {
      const id = compositeRowId(rowKey, row, parentId);
      // A top-level row's composite id equals its plain `rowKey` id (no
      // parent prefix) — only that depth is ever reported publicly.
      if (parentId === undefined && idSet.has(id)) roots.push(id);
      if (row.subRows) walk(row.subRows, id);
    }
  };

  walk(data as RowWithSubRows<T>[], undefined);
  return roots;
}

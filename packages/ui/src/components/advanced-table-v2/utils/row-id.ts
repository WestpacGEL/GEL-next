import { ExpandedState, RowSelectionState } from '@tanstack/react-table';

import { AdvancedTableExpandedState, AdvancedTableRowKey } from '../advanced-table.types.js';

/** Derives a row's stable id from `rowKey`: the field value (stringified) for
 * a `keyof T`, or the function's return value. */
export function resolveRowId<T>(rowKey: AdvancedTableRowKey<T>, row: T): string {
  return typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey]);
}

type RowWithSubRows<T> = T & { subRows?: RowWithSubRows<T>[] };

/** Create rowId using the parentId prefixed to the ID. This is required or IDs will clashed with collapsed rows. */
export function compositeRowId<T>(rowKey: AdvancedTableRowKey<T>, row: T, parentId: string | undefined): string {
  const ownId = resolveRowId(rowKey, row);
  return parentId ? `${parentId}.${ownId}` : ownId;
}

/** Returns every row ID in the data set including nested rows. */
export function collectRowIds<T>(data: T[], rowKey: AdvancedTableRowKey<T>): Set<string> {
  const ids = new Set<string>();

  const walk = (rows: RowWithSubRows<T>[], parentId: string | undefined) => {
    for (const row of rows) {
      const id = compositeRowId(rowKey, row, parentId);
      ids.add(id);
      if (row.subRows) walk(row.subRows, id);
    }
  };

  walk(data as RowWithSubRows<T>[], undefined);
  return ids;
}

/**
 * Clears a parent row's own selection id once it no longer matches every one
 * of its children being selected. TanStack's `row.toggleSelected` cascades a
 * selection change down to descendants but never back up to ancestors, so
 * clearing one child leaves a parent's own id stale.
 * TODO: Verify if this is intended behaviour.
 */
export function normalizeRowSelection<T>(ids: string[], data: T[], rowKey: AdvancedTableRowKey<T>): string[] {
  const selected = new Set(ids);

  const walk = (rows: RowWithSubRows<T>[], parentId: string | undefined): boolean =>
    rows.reduce((allSelected, row) => {
      const id = compositeRowId(rowKey, row, parentId);
      const allChildrenSelected = row.subRows?.length ? walk(row.subRows, id) : selected.has(id);
      if (!allChildrenSelected) selected.delete(id);
      return allSelected && allChildrenSelected;
    }, true);

  walk(data as RowWithSubRows<T>[], undefined);
  return [...selected];
}

/** Builds rowID referenced to table to avoid duplicate IDs with multiple instances */
export function rowElementId(tableId: string, rowId: string): string {
  return `${tableId}-row-${rowId}`;
}

/** Converts the public `string[]` of selected row ids into the `RowSelectionState`
 * record (`Record<id, true>`) TanStack's row-selection engine expects. Ids not in
 * `validIds` (ids no longer in `data`) are dropped, so a stale id can't make the
 * select-all checkbox read as indeterminate/checked when no current row is actually selected. */
export function idsToSelectionState(ids: string[], validIds: Set<string>): RowSelectionState {
  const selection: RowSelectionState = {};
  for (const id of ids) {
    if (validIds.has(id)) selection[id] = true;
  }
  return selection;
}

/** Converts TanStack's `RowSelectionState` record back into the public `string[]`
 * of selected row ids. */
export function selectionStateToIds(selection: RowSelectionState): string[] {
  return Object.entries(selection)
    .filter(([, isSelected]) => isSelected)
    .map(([id]) => id);
}

/**
 * Converts the public {@link AdvancedTableExpandedState} into TanStack's
 * `ExpandedState`. Unlike {@link idsToSelectionState}, this doesn't drop ids
 * that don't match a known row — expansion ids include ones TanStack makes
 * up itself (for grouped rows) or plain index ids (when there's no
 * `rowKey`), so filtering them the way selection does actually broke
 * expand/collapse instead of protecting anything.
 */
// eslint-disable-next-line sonarjs/function-return-type -- ExpandedState is TanStack's own `true | Record<string, boolean>`.
export function idsToExpandedState(state: AdvancedTableExpandedState): ExpandedState {
  if (state === true) return true;
  const expanded: ExpandedState = {};
  for (const id of state) {
    expanded[id] = true;
  }
  return expanded;
}

/** Converts TanStack's `ExpandedState` back into the public
 * {@link AdvancedTableExpandedState} (mirrors {@link selectionStateToIds}). */
// eslint-disable-next-line sonarjs/function-return-type -- AdvancedTableExpandedState is legitimately `string[] | true`.
export function expandedStateToIds(state: ExpandedState): AdvancedTableExpandedState {
  if (state === true) return true;
  return Object.entries(state)
    .filter(([, isExpanded]) => isExpanded)
    .map(([id]) => id);
}

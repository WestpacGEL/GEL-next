import { RowSelectionState } from '@tanstack/react-table';

import { AdvancedTableRowKey } from '../advanced-table.types.js';

/** Derives a row's stable id from `rowKey`: the field value (stringified) for
 * a `keyof T`, or the function's return value. */
export function resolveRowId<T>(rowKey: AdvancedTableRowKey<T>, row: T): string {
  return typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey]);
}

/** Converts the public `string[]` of selected row ids into the `RowSelectionState`
 * record (`Record<id, true>`) TanStack's row-selection engine expects. Ids not in
 * `validIds` (e.g. stale ids left over from a row that was since removed from
 * `data`) are dropped, so a stale id can't make the select-all checkbox read as
 * indeterminate/checked when no current row is actually selected. */
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

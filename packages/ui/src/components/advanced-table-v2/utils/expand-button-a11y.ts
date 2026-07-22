import { Row } from '@tanstack/react-table';

import { rowElementId } from './row-id.js';

/**
 * Returns the accessibility attributes for a row's expand/collapse toggle button.
 *
 * @param tableId - The resolved table id, used to namespace generated element ids
 * @param row - The TanStack table row the button toggles
 * @param value - The value labelling the button
 * @param hasDetailPanel - Whether the row expands into a detail panel
 */
export function getExpandButtonA11yProps<T>(tableId: string, row: Row<T>, value: unknown, hasDetailPanel: boolean) {
  const isExpanded = row.getIsExpanded();
  const label = typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
  const action = isExpanded ? 'Collapse' : 'Expand';

  // `aria-controls` can only be used if the element exists, TanStack does not mount sub-rows/detail panels while collapsed.
  let controls: string | undefined;
  if (isExpanded) {
    if (hasDetailPanel) {
      controls = `${tableId}-detail-panel-${row.id}`;
    } else {
      controls = row.subRows.map(sub => rowElementId(tableId, sub.id)).join(' ') || undefined;
    }
  }

  return {
    'aria-controls': controls,
    'aria-expanded': isExpanded,
    'aria-label': label ? `${action} ${label}` : action,
  };
}

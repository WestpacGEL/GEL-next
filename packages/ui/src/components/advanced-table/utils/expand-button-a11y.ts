import { Row } from '@tanstack/react-table';

/**
 * Returns the accessibility attributes for a row's expand/collapse toggle button.
 *
 * @param row - The TanStack table row the button toggles
 * @param value - The value of the cell the button lives in, used to label the button
 * @param hasDetailPanel - Whether the row expands into a detail panel
 */
export function getExpandButtonA11yProps<T>(row: Row<T>, value: unknown, hasDetailPanel: boolean) {
  const label = typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
  const controls = hasDetailPanel ? `detail-panel-${row.id}` : row.subRows.map(sub => sub.id).join(' ');
  const action = row.getIsExpanded() ? 'Collapse' : 'Expand';

  return {
    'aria-expanded': row.getIsExpanded(),
    'aria-controls': controls || undefined,
    'aria-label': label ? `${action} ${label}` : action,
  };
}

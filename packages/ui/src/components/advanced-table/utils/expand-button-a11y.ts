import { Row } from '@tanstack/react-table';

/**
 * Returns the accessibility attributes for a row's expand/collapse toggle button.
 *
 * @param row - The TanStack table row the button toggles
 * @param value - The value of the cell the button lives in, used to label the button
 * @param hasDetailPanel - Whether the row expands into a detail panel
 */
export function getExpandButtonA11yProps<T>(row: Row<T>, value: unknown, hasDetailPanel: boolean) {
  const isExpanded = row.getIsExpanded();
  const label = typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
  const action = isExpanded ? 'Collapse' : 'Expand';

  // aria-controls can only be used if the element exists, tanstack does not mount the rows if it is collapsed
  let controls: string | undefined;
  if (isExpanded) {
    if (hasDetailPanel) {
      controls = `detail-panel-${row.id}`;
    } else if (!row.getIsPinned()) {
      controls = row.subRows.map(sub => sub.id).join(' ') || undefined;
    }
  }

  return {
    'aria-controls': controls,
    'aria-expanded': isExpanded,
    'aria-label': label ? `${action} ${label}` : action,
  };
}

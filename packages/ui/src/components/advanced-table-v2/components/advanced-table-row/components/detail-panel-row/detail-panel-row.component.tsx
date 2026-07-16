import { useAdvancedTableContext } from '../../../../advanced-table.context.js';

import { styles as detailPanelRowStyles } from './detail-panel-row.styles.js';
import { DetailPanelRowProps } from './detail-panel-row.types.js';

/** Renders `renderDetailPanel`'s content beneath an expanded row as a single full-width cell. */
export function DetailPanelRow<T>({ row }: DetailPanelRowProps<T>) {
  const { renderDetailPanel, padding, bordered, tableId } = useAdvancedTableContext<T>();
  // No renderer, not expandable, not expanded, or has real sub-rows (tree children win).
  if (!renderDetailPanel || !row.getCanExpand() || !row.getIsExpanded() || row.subRows.length > 0) return null;

  const content = renderDetailPanel(row.original, { depth: row.depth });
  // Only null/undefined/boolean count as "no content".
  if (content === null || content === undefined || typeof content === 'boolean') return null;

  const styles = detailPanelRowStyles({ padding, bordered });

  return (
    <tr id={`${tableId}-detail-panel-${row.id}`}>
      <td colSpan={row.getVisibleCells().length} className={styles.td()}>
        {content}
      </td>
    </tr>
  );
}

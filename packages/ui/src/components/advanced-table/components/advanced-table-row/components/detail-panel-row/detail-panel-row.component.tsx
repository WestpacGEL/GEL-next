import { useContext } from 'react';

import { AdvancedTableContext } from '../../../../advanced-table.context.js';

import { styles as detailPanelRowStyles } from './detail-panel-row.styles.js';
import { DetailPanelRowProps } from './detail-panel-row.types.js';

export function DetailPanelRow<T>({ row, extraCellPadding, bordered }: DetailPanelRowProps<T>) {
  const { renderDetailPanel } = useContext(AdvancedTableContext);
  if (!renderDetailPanel || !row.getIsExpanded()) return null;

  const content = renderDetailPanel(row);
  if (!content) return null;

  const styles = detailPanelRowStyles({ extraCellPadding, bordered });

  return (
    <tr>
      <td colSpan={row.getVisibleCells().length} className={styles.td()}>
        {content}
      </td>
    </tr>
  );
}

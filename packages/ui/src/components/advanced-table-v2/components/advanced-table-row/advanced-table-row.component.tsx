import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { rowElementId } from '../../utils/index.js';
import { AdvancedTableCell } from '../advanced-table-cell/index.js';

import { styles as advancedTableRowStyles } from './advanced-table-row.styles.js';
import { AdvancedTableRowProps } from './advanced-table-row.types.js';
import { DetailPanelRow } from './components/detail-panel-row/index.js';

export function AdvancedTableRow<T>({ row, isPinned }: AdvancedTableRowProps<T>) {
  const { background, tableId } = useAdvancedTableContext<T>();
  const bgValue: 'filled' | 'striped' | 'transparent' | undefined = isPinned ? undefined : background;
  const styles = advancedTableRowStyles({ background: bgValue, isPinned });

  return (
    <>
      <tr className={styles.row()} id={rowElementId(tableId, row.id)}>
        {row.getVisibleCells().map(cell => (
          <AdvancedTableCell cell={cell} key={cell.id} />
        ))}
      </tr>
      <DetailPanelRow row={row} />
    </>
  );
}

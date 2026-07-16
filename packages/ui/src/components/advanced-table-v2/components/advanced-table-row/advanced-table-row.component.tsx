import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { rowElementId } from '../../utils/index.js';
import { AdvancedTableCell } from '../advanced-table-cell/index.js';

import { styles as advancedTableRowStyles } from './advanced-table-row.styles.js';
import { AdvancedTableRowProps } from './advanced-table-row.types.js';
import { DetailPanelRow } from './components/detail-panel-row/index.js';

export function AdvancedTableRow<T>({ row }: AdvancedTableRowProps<T>) {
  const { background, tableId } = useAdvancedTableContext<T>();
  const styles = advancedTableRowStyles({ background });

  return (
    <>
      <tr id={rowElementId(tableId, row.id)} className={styles.row()}>
        {row.getVisibleCells().map(cell => (
          <AdvancedTableCell key={cell.id} cell={cell} />
        ))}
      </tr>
      <DetailPanelRow row={row} />
    </>
  );
}

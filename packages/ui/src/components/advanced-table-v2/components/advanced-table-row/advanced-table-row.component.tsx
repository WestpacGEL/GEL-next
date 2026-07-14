import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { AdvancedTableCell } from '../advanced-table-cell/index.js';

import { styles as advancedTableRowStyles } from './advanced-table-row.styles.js';
import { AdvancedTableRowProps } from './advanced-table-row.types.js';

export function AdvancedTableRow<T>({ row }: AdvancedTableRowProps<T>) {
  const { background } = useAdvancedTableContext<T>();
  const styles = advancedTableRowStyles({ background });

  return (
    <tr className={styles.row()}>
      {row.getVisibleCells().map(cell => (
        <AdvancedTableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
}

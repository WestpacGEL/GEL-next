import { AdvancedTableHeadRow } from '../advanced-table-head-row/advanced-table-head-row.component.js';

import { styles as advancedTableHeadStyles } from './advanced-table-head.styles.js';
import { AdvancedTableHeadProps } from './advanced-table-head.types.js';

export function AdvancedTableHead<T>({
  scrollableColumns,
  scrollableRows,
  table,
  columnVirtualizer,
}: AdvancedTableHeadProps<T>) {
  const styles = advancedTableHeadStyles({ scrollableColumns, scrollableRows });

  return (
    <thead className={styles.tableHeader()}>
      {table.getHeaderGroups().map(headerGroup => (
        <AdvancedTableHeadRow
          columnVirtualizer={columnVirtualizer}
          key={headerGroup.id}
          headerGroup={headerGroup}
          table={table}
          scrollableColumns={scrollableColumns}
        />
      ))}
    </thead>
  );
}

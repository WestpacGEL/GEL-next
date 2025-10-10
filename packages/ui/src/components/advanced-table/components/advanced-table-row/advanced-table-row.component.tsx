import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useContext, useRef } from 'react';

import { AdvancedTableContext } from '../../advanced-table.component.js';
import { handleTableRowKeyDown } from '../../utils/accessibility-functions.js';
import { AdvancedTableCell } from '../advanced-table-cell/advanced-table-cell.component.js';

import { styles as AdvancedTableRowStyles } from './advanced-table-row.styles.js';
import { AdvancedTableRowProps } from './advanced-table-row.types.js';

export function AdvancedTableRow<T>({ rows, row, virtualRow, rowVirtualizer, tbodyRef }: AdvancedTableRowProps<T>) {
  const { scrollableRows, scrollableColumns, columnOrder } = useContext(AdvancedTableContext);
  const styles = AdvancedTableRowStyles({ scrollableRows, scrollableColumns });
  const localVirtualRow = rows && rows[virtualRow?.index ?? 0];
  const rowRef = useRef<HTMLTableRowElement>(null);

  return scrollableRows ? (
    <tr
      data-index={virtualRow?.index}
      ref={node => {
        rowVirtualizer?.measureElement(node); // measure dynamic row height
      }}
      className={styles.bodyRow()}
      style={{
        transform: `translateY(${virtualRow?.start}px)`,
      }}
      id={`row-${virtualRow?.index}`}
      tabIndex={0}
      onKeyDown={handleTableRowKeyDown}
    >
      {localVirtualRow?.getVisibleCells().map(cell => (
        <SortableContext key={cell.id} items={columnOrder ?? []} strategy={horizontalListSortingStrategy}>
          <AdvancedTableCell key={cell.id} cell={cell} rowRef={rowRef} />
        </SortableContext>
      ))}
    </tr>
  ) : (
    <tr className={styles.bodyRow()} id={row?.id} ref={rowRef} tabIndex={0} onKeyDown={handleTableRowKeyDown}>
      {row?.getVisibleCells().map(cell => (
        <SortableContext key={cell.id} items={columnOrder ?? []} strategy={horizontalListSortingStrategy}>
          <AdvancedTableCell key={cell.id} cell={cell} rowRef={rowRef} />
        </SortableContext>
      ))}
    </tr>
  );
}

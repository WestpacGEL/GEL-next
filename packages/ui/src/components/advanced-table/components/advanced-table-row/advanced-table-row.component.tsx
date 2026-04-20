import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useContext, useRef } from 'react';

import { AdvancedTableContext } from '../../advanced-table.context.js';
import { AdvancedTableCell } from '../advanced-table-cell/advanced-table-cell.component.js';

import { styles as AdvancedTableRowStyles } from './advanced-table-row.styles.js';
import { AdvancedTableRowProps } from './advanced-table-row.types.js';

export function AdvancedTableRow<T>({ rows, row, virtualRow, rowVirtualizer, isPinned }: AdvancedTableRowProps<T>) {
  const { scrollableRows, scrollableColumns, columnOrder, striped } = useContext(AdvancedTableContext);
  const styles = AdvancedTableRowStyles({ scrollableRows, scrollableColumns, isPinned, striped });
  const localVirtualRow = rows && rows[virtualRow?.index ?? 0];
  const rowRef = useRef<HTMLTableRowElement>(null);

  if (isPinned && row) {
    return (
      <tr className={styles.bodyRow()} id={`row-pinned-${row.id}`} ref={rowRef}>
        {row.getVisibleCells().map(cell => (
          <SortableContext key={cell.id} items={columnOrder ?? []} strategy={horizontalListSortingStrategy}>
            <AdvancedTableCell key={cell.id} cell={cell} rowRef={rowRef} />
          </SortableContext>
        ))}
      </tr>
    );
  }

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
    >
      {localVirtualRow?.getVisibleCells().map(cell => (
        <SortableContext key={cell.id} items={columnOrder ?? []} strategy={horizontalListSortingStrategy}>
          <AdvancedTableCell key={cell.id} cell={cell} rowRef={rowRef} />
        </SortableContext>
      ))}
    </tr>
  ) : (
    <tr className={styles.bodyRow()} id={row?.id} ref={rowRef}>
      {row?.getVisibleCells().map(cell => (
        <SortableContext key={cell.id} items={columnOrder ?? []} strategy={horizontalListSortingStrategy}>
          <AdvancedTableCell key={cell.id} cell={cell} rowRef={rowRef} />
        </SortableContext>
      ))}
    </tr>
  );
}

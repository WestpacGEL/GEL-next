import { useVirtualizer } from '@tanstack/react-virtual';
import { useContext, useRef } from 'react';

import { AdvancedTableContext } from '../../advanced-table.component.js';
import { AdvancedTableRow } from '../advanced-table-row/advanced-table-row.component.js';

import { styles as AdvancedTableBodyStyles } from './advanced-table-body.styles.js';
import { AdvancedTableBodyProps } from './advanced-table-body.types.js';

export function AdvancedTableBody<T>({ table, tableRef }: AdvancedTableBodyProps<T>) {
  const { scrollableRows, scrollableColumns } = useContext(AdvancedTableContext);
  const styles = AdvancedTableBodyStyles({ scrollableRows, scrollableColumns });
  const { rows } = table.getRowModel();
  const bodyRef = useRef(null);

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 45, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return scrollableRows ? (
    <tbody
      className={styles.tableBody()}
      style={{ width: table.getTotalSize(), height: rowVirtualizer.getTotalSize() }}
      ref={bodyRef}
    >
      {rowVirtualizer.getVirtualItems().map(virtualRow => {
        return (
          <AdvancedTableRow
            key={rows[virtualRow.index].id}
            rows={rows}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
          />
        );
      })}
    </tbody>
  ) : (
    <tbody className={styles.tableBody()} ref={bodyRef}>
      {table.getRowModel().rows.map(row => (
        <AdvancedTableRow key={row.id} row={row} tbodyRef={bodyRef} />
      ))}
    </tbody>
  );
}

import { useVirtualizer } from '@tanstack/react-virtual';
import { useContext, useRef } from 'react';

import { AdvancedTableContext } from '../../advanced-table.context.js';
import { AdvancedTableRow } from '../advanced-table-row/advanced-table-row.component.js';
import { PinnedRows } from '../pinned-rows/pinned-rows.component.js';

import { styles as AdvancedTableBodyStyles } from './advanced-table-body.styles.js';
import { AdvancedTableBodyProps } from './advanced-table-body.types.js';

export function AdvancedTableBody<T>({ table, tableRef, theadRef }: AdvancedTableBodyProps<T>) {
  const { scrollableRows, scrollableColumns, enableRowPinning } = useContext(AdvancedTableContext);
  const styles = AdvancedTableBodyStyles({ scrollableRows, scrollableColumns });
  const bodyRef = useRef(null);

  const topRows = enableRowPinning ? table.getTopRows() : [];
  const centerRows = enableRowPinning ? table.getCenterRows() : table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: centerRows.length,
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
    <>
      <PinnedRows rows={topRows} scrollableRows={scrollableRows} theadRef={theadRef} />
      <tbody
        className={styles.tableBody()}
        style={{ width: table.getTotalSize(), height: rowVirtualizer.getTotalSize() }}
        ref={bodyRef}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          return (
            <AdvancedTableRow
              key={centerRows[virtualRow.index].id}
              rows={centerRows}
              virtualRow={virtualRow}
              rowVirtualizer={rowVirtualizer}
            />
          );
        })}
      </tbody>
    </>
  ) : (
    <>
      <PinnedRows rows={topRows} />
      <tbody className={styles.tableBody()} ref={bodyRef}>
        {centerRows.map(row => (
          <AdvancedTableRow key={row.id} row={row} tbodyRef={bodyRef} />
        ))}
      </tbody>
    </>
  );
}

import { useContext } from 'react';

import { AdvancedTableContext } from '../../advanced-table.component.js';
import { AdvancedTableHeadCell } from '../advanced-table-head-cell/advanced-table-head-cell.component.js';

import { styles as AdvancedTableHeadRowStyles } from './advanced-table-head-row.styles.js';
import { AdvancedTableHeadRowProps } from './advanced-table-head-row.types.js';

export function AdvancedTableHeadRow<T>({
  scrollableColumns,
  headerGroup,
  table,
  columnVirtualizer,
}: AdvancedTableHeadRowProps<T>) {
  const { columnPinning } = useContext(AdvancedTableContext);

  const visibleColumns = table.getVisibleLeafColumns();

  const virtualColumns = columnVirtualizer.getVirtualItems();

  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    const leftPadding = () => {
      const pinnedColLength = columnPinning?.left?.length;
      const totalLeftPinned =
        columnPinning?.left?.reduce((acc, col) => acc + visibleColumns[Number(col)].getSize(), 0) ?? 0;
      const totalRightPinned =
        columnPinning?.right?.reduce((acc, col) => acc + visibleColumns[Number(col)].getSize(), 0) ?? 0;
      if (pinnedColLength && pinnedColLength > 0 && columnPinning?.left) {
        const pinnedWidth = virtualColumns[pinnedColLength].start - totalLeftPinned + totalRightPinned;
        const firstPagePadding = virtualColumns[pinnedColLength].start - virtualColumns[pinnedColLength - 1].end;

        return firstPagePadding > 0 ? pinnedWidth : firstPagePadding;
      }

      return virtualColumns[0].start;
    };

    virtualPaddingLeft = leftPadding();
    virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  const styles = AdvancedTableHeadRowStyles({ scrollableColumns });
  return scrollableColumns ? (
    <tr key={headerGroup.id} className={styles.headerRow()} style={{ width: table.getTotalSize() }}>
      {virtualPaddingLeft ? (
        //fake empty column to the left for virtualization scroll padding
        <th style={{ width: virtualPaddingLeft }} />
      ) : null}
      {virtualColumns.map(virtualColumn => {
        const header = headerGroup.headers[virtualColumn.index];
        return (
          <AdvancedTableHeadCell<T>
            key={header.id}
            header={header}
            table={table}
            scrollableColumns={scrollableColumns}
          />
        );
      })}
      {virtualPaddingRight ? (
        //fake empty column to the right for virtualization scroll padding
        <th style={{ width: virtualPaddingRight }} />
      ) : null}
    </tr>
  ) : (
    <tr key={headerGroup.id} className={styles.headerRow()}>
      {headerGroup.headers.map(header => (
        <AdvancedTableHeadCell<T> key={header.id} header={header} table={table} scrollableColumns={scrollableColumns} />
      ))}
    </tr>
  );
}

import { Table } from '@tanstack/react-table';
import { useVirtualizer, Range, defaultRangeExtractor } from '@tanstack/react-virtual';
import { RefObject, useCallback } from 'react';

export const useVirtualizedColumns = <T>(table: Table<T>, tableRef: RefObject<HTMLDivElement>) => {
  const visibleColumns = table.getVisibleLeafColumns();
  const leftColumns = table.getLeftLeafColumns();
  const rightColumns = table.getRightLeafColumns();

  return useVirtualizer<HTMLDivElement, HTMLTableCellElement>({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(),
    getScrollElement: () => tableRef.current,
    rangeExtractor: useCallback(
      (range: Range) => {
        const next = new Set(defaultRangeExtractor(range));

        const leftPinned = leftColumns.map((_, index) => index);
        const rightPinned = rightColumns.map((_, index) => visibleColumns.length - (index + 1));
        const final = (): Set<number> => {
          return new Set([...leftPinned, ...next, ...rightPinned]);
        };

        return [...final()].sort((a, b) => a - b);
      },
      [leftColumns, rightColumns, visibleColumns.length],
    ),
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().width
        : undefined,
    horizontal: true,
    overscan: 5,
  });
};

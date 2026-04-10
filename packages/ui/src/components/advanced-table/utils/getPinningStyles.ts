import { Column } from '@tanstack/react-table';
import { CSSProperties } from 'react';

import { RESERVED_COLUMN_IDS } from './constants.js';

function getPinningBoxShadow(
  isReserved: boolean,
  isLastLeft: boolean,
  isFirstRight: boolean,
  scrollableColumns?: boolean,
): string | undefined {
  if (isReserved && !scrollableColumns) return undefined;
  if (isLastLeft) return '-4px 0 4px -4px gray inset';
  if (isFirstRight) return '4px 0 4px -4px gray inset';
  return undefined;
}

export const getCommonPinningStyles = <T>(column: Column<T>, scrollableColumns?: boolean): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isReservedColumn = RESERVED_COLUMN_IDS.includes(column.id);
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');
  return {
    boxShadow: getPinningBoxShadow(
      isReservedColumn,
      isLastLeftPinnedColumn,
      isFirstRightPinnedColumn,
      scrollableColumns,
    ),
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

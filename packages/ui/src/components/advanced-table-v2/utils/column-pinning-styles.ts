import { Column } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type PinnedEdge = 'left' | 'right' | undefined;

export type ColumnPinningStyleInfo = {
  /** Whether the column is currently pinned to either side. */
  isPinned: boolean;
  /** Set when this column sits at the pinned/unpinned scroll boundary, for the edge-shadow variant. */
  pinnedEdge: PinnedEdge;
  /** Sticky positioning, computed from the same `column.getSize()` the root `<colgroup>` uses. */
  style: CSSProperties;
};

/**
 * Derives sticky-position styling for a pinned column's header or body cell.
 * Shared by the head and cell components so a future fix to this math only
 * has to land in one place.
 */
export function getColumnPinningStyleInfo<T>(column: Column<T, unknown>): ColumnPinningStyleInfo {
  const pinned = column.getIsPinned();
  const isLastLeftPinned = pinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinned = pinned === 'right' && column.getIsFirstColumn('right');
  let pinnedEdge: PinnedEdge;
  if (isLastLeftPinned) pinnedEdge = 'left';
  else if (isFirstRightPinned) pinnedEdge = 'right';

  return {
    isPinned: Boolean(pinned),
    pinnedEdge,
    style: {
      position: pinned ? 'sticky' : undefined,
      left: pinned === 'left' ? column.getStart('left') : undefined,
      right: pinned === 'right' ? column.getAfter('right') : undefined,
      zIndex: pinned ? 1 : undefined,
    },
  };
}

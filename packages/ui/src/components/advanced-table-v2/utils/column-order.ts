import { Announcements } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Table } from '@tanstack/react-table';

import { ColumnReorderInfo } from '../advanced-table.context.js';

import { RESERVED_COLUMN_IDS } from './reserved-columns.js';

/** Top-level reorderable unit */
type ColumnOrderBlock = {
  /** The block's id: the leaf column's id, or the group column's id. */
  id: string;
  /** Every leaf column id nested inside this block. */
  leafIds: string[];
};

/** Returns the top row's non-placeholder header cells */
function getTopLevelBlocks<T>(table: Table<T>): ColumnOrderBlock[] {
  const topRow = table.getHeaderGroups()[0];
  if (!topRow) return [];
  return topRow.headers
    .filter(header => !header.isPlaceholder)
    .map(header => ({ id: header.column.id, leafIds: header.column.getLeafColumns().map(leaf => leaf.id) }));
}

// Checks if the column is re-orderable: reserved and pinned
function isBlockReorderable<T>(table: Table<T>, block: ColumnOrderBlock): boolean {
  if (RESERVED_COLUMN_IDS.includes(block.id)) return false;
  return block.leafIds.every(leafId => !table.getColumn(leafId)?.getIsPinned());
}

/**
 * Every reorderable-column fact a render needs, computed in one pass over the
 * header row instead of separately per header cell and per column-menu instance.
 */
export function getReorderInfo<T>(table: Table<T>): ColumnReorderInfo {
  const reorderable = getTopLevelBlocks(table).filter(block => isBlockReorderable(table, block));
  const ids = reorderable.map(block => block.id);
  const moveBoundaries = new Map(
    reorderable.map((block, index) => [
      block.id,
      { canMoveLeft: index > 0, canMoveRight: index < reorderable.length - 1 },
    ]),
  );
  return { ids, idSet: new Set(ids), moveBoundaries };
}

/**
 * Moves `activeId`'s block among the reorderable subsequence only — reserved
 * and pinned blocks keep their absolute slot, so a reorderable block only
 * ever slides past other reorderable blocks. Returns the resulting flat
 * leaf-id order for `columnOrder`, or `null` when the move isn't possible.
 */
function reorderBlocks<T>(
  table: Table<T>,
  activeId: string,
  resolveTargetIndex: (reorderable: ColumnOrderBlock[], activeIndex: number) => number,
): string[] | null {
  const blocks = getTopLevelBlocks(table);
  const mask = blocks.map(block => isBlockReorderable(table, block));
  const reorderable = blocks.filter((_, index) => mask[index]);
  const activeIndex = reorderable.findIndex(block => block.id === activeId);
  if (activeIndex === -1) return null;

  const targetIndex = resolveTargetIndex(reorderable, activeIndex);
  if (targetIndex === -1 || targetIndex === activeIndex || targetIndex >= reorderable.length) return null;

  const nextReorderable = arrayMove(reorderable, activeIndex, targetIndex);
  let cursor = 0;
  const nextBlocks = blocks.map((block, index) => (mask[index] ? nextReorderable[cursor++] : block));
  return nextBlocks.flatMap(block => block.leafIds);
}

/** New flat leaf order moving `columnId` one position left, or `null` at the boundary. */
export function moveColumnLeft<T>(table: Table<T>, columnId: string): string[] | null {
  return reorderBlocks(table, columnId, (_, activeIndex) => activeIndex - 1);
}

/** New flat leaf order moving `columnId` one position right, or `null` at the boundary. */
export function moveColumnRight<T>(table: Table<T>, columnId: string): string[] | null {
  return reorderBlocks(table, columnId, (_, activeIndex) => activeIndex + 1);
}

/** New flat leaf order moving `activeId`'s block to sit where `overId`'s block currently is — drag-and-drop's and keyboard reordering's shared drop logic. */
export function moveColumnTo<T>(table: Table<T>, activeId: string, overId: string): string[] | null {
  return reorderBlocks(table, activeId, reorderable => reorderable.findIndex(block => block.id === overId));
}

/** A reorderable block's display name — used for reordering's live-region announcements. */
export function getColumnDisplayName<T>(table: Table<T>, columnId: string): string {
  const header = table.getColumn(columnId)?.columnDef.header;
  return typeof header === 'string' ? header : columnId;
}

/**
 * Builds dnd-kit's pick-up/move/drop screen-reader announcements — fed into
 * both dnd-kit's own live region and the table's own (so tests, and assistive
 * tech relying on either, both see the same text).
 */
export function buildReorderAnnouncements<T>(table: Table<T>, announce: (text: string) => void): Announcements {
  return {
    onDragStart({ active }) {
      const message = `Picked up ${getColumnDisplayName(table, String(active.id))}. Use the arrow keys to move, space bar to drop.`;
      announce(message);
      return message;
    },
    onDragOver({ active, over }) {
      // dnd-kit fires an onDragOver for the item's own starting position at drag
      // start, skip it so the pick-up announcement isn't immediately overwritten.
      if (!over || over.id === active.id) return undefined;
      const name = getColumnDisplayName(table, String(active.id));
      const message = `${name} was moved. It is now placed next to ${getColumnDisplayName(table, String(over.id))}.`;
      announce(message);
      return message;
    },
    onDragEnd({ active, over }) {
      const name = getColumnDisplayName(table, String(active.id));
      const message = over ? `${name} dropped.` : `${name} dropped. No changes were made.`;
      announce(message);
      return message;
    },
    onDragCancel({ active }) {
      const message = `Moving ${getColumnDisplayName(table, String(active.id))} was cancelled.`;
      announce(message);
      return message;
    },
  };
}

export function getPrefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

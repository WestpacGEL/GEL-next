import { Table } from '@tanstack/react-table';
import { createContext, ReactNode, useContext } from 'react';

import { AdvancedTableEmptyStateProps } from './components/advanced-table-empty-state/index.js';
import { AdvancedTableLoadingStateProps } from './components/advanced-table-loading-state/index.js';

// Which top-level columns can currently be reordered, and their move-left/move-right availability.
export type ColumnReorderInfo = {
  /** Reorderable column ids, in current display order (feeds `SortableContext`'s `items`). */
  ids: string[];
  /** Same ids as `ids`. */
  idSet: Set<string>;
  /** Move-left/move-right availability per reorderable column id. */
  moveBoundaries: Map<string, { canMoveLeft: boolean; canMoveRight: boolean }>;
};

/**
 * Shared state passed down to the table's sub-components (head, body, row, cell).
 *
 * Holds the internal TanStack `table` instance, ids, and the raw style **variant
 * values** — each sub-component invokes its own `styles({...})` from these.
 */
export type AdvancedTableContextValue<T> = {
  /** Row-background treatment. */
  background?: 'transparent' | 'striped' | 'filled';
  /** Draws additional borders around the table and between columns. */
  bordered?: boolean;
  /** Empty-state configuration rendered when there are no rows. */
  emptyState?: AdvancedTableEmptyStateProps;
  /**
   * Whether the consumer has opted into column pinning. The reserved selection
   * column is always structurally sticky regardless of this flag.
   */
  enableColumnPinning?: boolean;
  /** Whether the consumer has opted into column reordering (drag, keyboard, and column-menu move actions). */
  enableColumnReordering?: boolean;
  /** Whether the table is in its loading state. */
  loading?: boolean;
  /** Loading-state configuration rendered when `loading` is true and there are no rows yet. */
  loadingStateProps?: AdvancedTableLoadingStateProps;
  /** Sets the text of the column-pinning live region. */
  onPinAnnouncement?: (text: string) => void;
  /** Sets the text of the column-reordering live region (pick-up, movement, and drop). */
  onReorderAnnouncement?: (text: string) => void;
  /** Sets the text of the column-resizing live region (drag end, keyboard step, and reset). */
  onResizeAnnouncement?: (text: string) => void;
  /** Sets the text of the row-pinning live region (separate from column pinning's). */
  onRowPinAnnouncement?: (text: string) => void;
  /** Cell padding density. */
  padding?: 'default' | 'large';
  /** Selectable page sizes for the pagination page-size selector. */
  pageSizeOptions?: number[];
  /**
   * Renders arbitrary content beneath an expanded row. A rendering concern only
   * (never a TanStack table option) — read by the detail-panel-row sub-component.
   */
  renderDetailPanel?: (row: T, info: { depth: number }) => ReactNode;
  /** Reorderable-column ids and their move boundaries. */
  reorderInfo: ColumnReorderInfo;
  /** Internal TanStack table instance. */
  table: Table<T>;
  /** Resolved table id; also prefixes generated element ids. */
  tableId: string;
};

// The provider is typed to `unknown`; `useAdvancedTableContext<T>()` casts back to
// the caller's `T`. A generic React context can't preserve `T` on its own, so this
// is the standard internal escape hatch.
const AdvancedTableContext = createContext<AdvancedTableContextValue<unknown> | null>(null);

export const AdvancedTableProvider = AdvancedTableContext.Provider;

/** Reads the shared table context. Throws if used outside `<AdvancedTable>`. */
export function useAdvancedTableContext<T>(): AdvancedTableContextValue<T> {
  const context = useContext(AdvancedTableContext);
  if (!context) {
    throw new Error('useAdvancedTableContext must be used within <AdvancedTable>');
  }
  return context as AdvancedTableContextValue<T>;
}

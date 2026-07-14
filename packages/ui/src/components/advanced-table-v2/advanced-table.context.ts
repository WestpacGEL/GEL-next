import { Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

// Import the type from the leaf module rather than the `./components` barrel: the
// barrel re-exports the sub-components, which import this file back — going through
// it would form a module import cycle.
import { AdvancedTableEmptyStateProps } from './components/advanced-table-empty-state/index.js';

/**
 * Shared state passed down to the table's sub-components (head, body, row, cell).
 *
 * Holds the internal TanStack `table` instance, ids, and the raw style **variant
 * values** — each sub-component invokes its own `styles({...})` from these, so no
 * TanStack type ever leaks into the public API. Per-iteration objects (`row`,
 * `cell`) are passed as props by the mapping parent, not here.
 */
export type AdvancedTableContextValue<T> = {
  /** Internal TanStack table instance. Never exposed through the public API. */
  table: Table<T>;
  /** Resolved table id; also prefixes generated element ids. */
  tableId: string;
  /** Empty-state configuration rendered when there are no rows. */
  emptyState?: AdvancedTableEmptyStateProps;
  /** Row-background treatment. */
  background?: 'transparent' | 'striped' | 'filled';
  /** Cell padding density. */
  padding?: 'default' | 'large';
  /** Draws additional borders around the table and between columns. */
  bordered?: boolean;
};

// The provider is typed to `unknown`; `useAdvancedTableContext<T>()` casts back to
// the caller's `T`. A generic React context can't preserve `T` on its own, so this
// is the standard internal escape hatch (the old component used `any` for the same).
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

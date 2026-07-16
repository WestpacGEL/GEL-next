import { Row, Table } from '@tanstack/react-table';

/** Props for the per-row pin toggle rendered in the reserved pin column. */
export type AdvancedTableRowPinToggleProps<T> = {
  /** The internal TanStack row this toggle pins/unpins. */
  row: Row<T>;
  /** The internal TanStack table instance (used to derive the row's visible position). */
  table: Table<T>;
};

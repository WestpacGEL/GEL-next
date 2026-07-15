import { Row, Table } from '@tanstack/react-table';

/** Props for the per-row selection checkbox rendered in the reserved select column. */
export type AdvancedTableRowCheckboxProps<T> = {
  /** The internal TanStack row this checkbox selects. */
  row: Row<T>;
  /** The internal TanStack table instance (used to derive the row's visible position). */
  table: Table<T>;
};

/** Props for the header select-all checkbox rendered in the reserved select column. */
export type AdvancedTableSelectAllCheckboxProps<T> = {
  /** The internal TanStack table instance. */
  table: Table<T>;
};

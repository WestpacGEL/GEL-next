import { Cell } from '@tanstack/react-table';

export type AdvancedTableCellProps<T> = {
  /** The internal TanStack cell to render (supplied by the parent row). */
  cell: Cell<T, unknown>;
};

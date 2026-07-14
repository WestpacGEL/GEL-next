import { Row } from '@tanstack/react-table';

export type AdvancedTableRowProps<T> = {
  /** The internal TanStack row to render (supplied by the table body). */
  row: Row<T>;
};

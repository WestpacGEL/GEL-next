import { Row } from '@tanstack/react-table';

export type AdvancedTableGroupRowProps<T> = {
  /** The internal TanStack group-header row to render (supplied by the table body). */
  row: Row<T>;
};

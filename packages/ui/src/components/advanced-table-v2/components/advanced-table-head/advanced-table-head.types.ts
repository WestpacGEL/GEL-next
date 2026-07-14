import { Header } from '@tanstack/react-table';

/** Props for the private header-cell renderer inside {@link AdvancedTableHead}. */
export type AdvancedTableHeaderCellProps<T> = {
  /** The internal TanStack header for this column. */
  header: Header<T, unknown>;
};

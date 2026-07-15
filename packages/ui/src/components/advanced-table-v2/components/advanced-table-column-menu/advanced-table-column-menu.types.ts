import { Header } from '@tanstack/react-table';

/** Props for the private column-menu trigger rendered inside a header cell. */
export type AdvancedTableColumnMenuProps<T> = {
  /** The internal TanStack header for this column. */
  header: Header<T, unknown>;
};

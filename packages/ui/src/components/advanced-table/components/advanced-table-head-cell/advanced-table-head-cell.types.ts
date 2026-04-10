import { Header } from '@tanstack/react-table';

export type AdvancedTableHeadCellProps<T> = {
  /**
   * Header instance
   */
  header: Header<T, unknown>;
  /**
   * Sets table to use virtualized scrollable columns
   */
  scrollableColumns?: boolean;
};

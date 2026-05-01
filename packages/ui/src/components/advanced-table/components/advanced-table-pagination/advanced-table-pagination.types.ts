import { Table } from '@tanstack/react-table';

export type AdvancedTablePaginationProps<T> = {
  /**
   * The TanStack table instance.
   */
  table: Table<T>;
  /**
   * Options for page size selection in the pagination select.
   */
  pageSizeOptions: number[];
};

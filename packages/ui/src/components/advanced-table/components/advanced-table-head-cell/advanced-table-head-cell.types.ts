import { Header, Table } from '@tanstack/react-table';

import { AdvancedTableProps } from '../../advanced-table.types.js';

export type AdvancedTableHeadCellProps<T> = {
  /**
   * Header instance
   */
  header: Header<T, unknown>;
  /**
   * Sets table to use virtualized scrollable columns
   */
  scrollableColumns?: AdvancedTableProps<T>['scrollableColumns'];
  /**
   * Sets table to use virtualized scrollable rows rather than pagination
   */
  scrollableRows?: AdvancedTableProps<T>['scrollableRows'];
  /**
   * Table instance
   */
  table: Table<T>;
};

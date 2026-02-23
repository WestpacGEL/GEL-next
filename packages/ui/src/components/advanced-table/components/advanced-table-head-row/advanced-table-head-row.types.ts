import { HeaderGroup, Table } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';

import { AdvancedTableProps } from '../../advanced-table.types.js';

export type AdvancedTableHeadRowProps<T> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  /**
   * Header group instance
   */
  headerGroup: HeaderGroup<T>;
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

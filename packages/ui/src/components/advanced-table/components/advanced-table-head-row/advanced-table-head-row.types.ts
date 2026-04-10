import { HeaderGroup, Table } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';

export type AdvancedTableHeadRowProps<T> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  /**
   * Header group instance
   */
  headerGroup: HeaderGroup<T>;
  /**
   * Sets table to use virtualized scrollable columns
   */
  scrollableColumns?: boolean;
  /**
   * Table instance
   */
  table: Table<T>;
};

import { Table } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';

import { AdvancedTableProps } from '../../advanced-table.types.js';

export type AdvancedTableHeadProps<T> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;

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
  /**
   * Ref to the thead element for measuring header height
   */
  theadRef?: RefObject<HTMLTableSectionElement>;
};

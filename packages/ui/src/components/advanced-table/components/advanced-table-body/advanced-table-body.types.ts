import { Table } from '@tanstack/react-table';
import { RefObject } from 'react';

import { AdvancedTableProps } from '../../advanced-table.types.js';

export type AdvancedTableBodyProps<T> = {
  /**
   * Table instance
   */
  table: Table<T>;
  tableRef: RefObject<HTMLDivElement>;
  /**
   * Ref to the thead element for measuring header height
   */
  theadRef?: RefObject<HTMLTableSectionElement>;
  /**
   * Sets table to use virtualized scrollable rows rather than pagination
   */
  scrollableRows?: AdvancedTableProps<T>['scrollableRows'];
};

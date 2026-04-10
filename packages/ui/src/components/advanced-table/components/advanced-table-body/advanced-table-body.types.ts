import { Table } from '@tanstack/react-table';
import { RefObject } from 'react';

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
};

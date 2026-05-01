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
  /**
   * Called when scrolled near the bottom (only with virtualized rows).
   */
  onLoadMore?: () => void;
  /**
   * While truthy, suppresses further `onLoadMore` calls.
   */
  isLoadingMore?: boolean;
  /**
   * Rows from the bottom that should trigger `onLoadMore`.
   */
  loadMoreThreshold?: number;
};

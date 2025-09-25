import {
  ColumnDef,
  ExpandedState,
  GroupColumnDef,
  PaginationState,
  TableOptions,
  Updater,
} from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type AdvancedColumnProps<T> = Omit<ColumnDef<T>, 'header' | 'meta' | 'id' | 'footer'> & {
  key: string;
  title: string;
  columns?: AdvancedColumnProps<T>[];
};

export type GroupedColumnProps<T> = Omit<
  GroupColumnDef<T>,
  'columns' | 'accessorFn' | 'cell' | 'header' | 'meta' | 'id' | 'footer'
> & {
  key: string;
  title: string;
};

export type TanstackTableOptions<T> = Omit<
  TableOptions<T>,
  | 'data'
  | 'columns'
  | 'columnResizeMode'
  | 'columnResizeDirection'
  | 'defaultColumn'
  | 'getExpandedRowModel'
  | 'getFacetedRowModel'
  | 'getFilteredRowModel'
  | 'getGroupedRowModel'
  | 'getPaginationRowModel'
  | 'getSortedRowModel'
  | 'getCoreRowModel'
  | 'groupedColumnMode'
>;

export type AdvancedTableProps<T> = {
  /**
   * The data to be displayed in the table should share type passed to table
   */
  data: T[];
  /**
   * Column information for table
   */
  columns: AdvancedColumnProps<T>[];
  expandedState?: ExpandedState;
  fixedHeight?: CSSProperties['height'];
  fixedWidth?: CSSProperties['width'];
  groupable?: boolean;
  tableOptions?: TanstackTableOptions<T>;
  /**
   * Whether manual pagination should be enabled for server side pagination
   */
  manualPagination?: boolean;
  onExpandedChange?: (expanded: Updater<ExpandedState>) => void;
  /**
   * Callback function to be called when pagination changes
   */
  onPaginationChange?: (pagination: Updater<PaginationState>) => void;
  /**
   * Number of pages for pagination. Only needs to be used with manual pagination
   */
  pageCount?: number;
  /**
   * Pagination state
   */
  pagination?: {
    /**
     * Current page index
     */
    pageIndex: number;
    /**
     * Page size
     */
    pageSize: number;
  };
  /**
   * Enables all columns to be resizable. Can also be done per-column in required columns array.
   */
  resizable?: boolean;
  /**
   * Number of rows of data, can be used instead of page count to determine number of pages for manual pagination when used with page size
   */
  rowCount?: number;
  selectable?: boolean;
  /**
   * Sets table to use virtualized scrollable columns
   */
  scrollableColumns?: boolean;
  /**
   * Sets table to use virtualized scrollable rows rather than pagination
   */
  scrollableRows?: boolean;
  /**
   * Enables all columns to be sortable. Can also be done per-column in required columns array.
   */
  sortable?: boolean;
  /**
   * If using expandable rows, this key will be used to identify the sub-rows
   */
  subRowKey?: string;
};

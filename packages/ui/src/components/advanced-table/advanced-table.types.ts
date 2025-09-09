import { ColumnDef, GroupColumnDef, PaginationState, Updater } from '@tanstack/react-table';

export type AdvancedColumnProps<T> = Omit<ColumnDef<T>, 'cell' | 'header' | 'meta' | 'id' | 'footer'> & {
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

export type AdvancedTableProps<T> = {
  /**
   * The data to be displayed in the table should share type passed to table
   */
  data: T[];
  /**
   * Column information for table
   */
  columns: AdvancedColumnProps<T>[];
  /**
   * Whether manual pagination should be enabled for server side pagination
   */
  manualPagination?: boolean;
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
  /**
   * Enables all columns to be sortable. Can also be done per-column in required columns array.
   */
  sortable?: boolean;
  /**
   * If using expandable rows, this key will be used to identify the sub-rows
   */
  subRowKey?: string;
  virtualized?: boolean;
};

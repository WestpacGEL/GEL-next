import { ColumnDef, TableOptions } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type AdvancedColumnProps<T> = Omit<ColumnDef<T>, 'header' | 'meta' | 'id' | 'footer'> & {
  key: string;
  title: string;
  columns?: AdvancedColumnProps<T>[];
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
  | 'enableColumnFilters'
  | 'enableColumnPinning'
  | 'enableSorting'
  | 'enableGrouping'
  | 'enableColumnResizing'
  | 'enableRowSelection'
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
  enableColumnFilter?: boolean;
  enableColumnPinning?: boolean;
  enableGrouping?: boolean;
  /**
   * Enables all columns to be resizable. Can also be done per-column in required columns array.
   */
  enableResizing?: boolean;
  enableRowSelection?: boolean;
  /**
   * Enables all columns to be sortable. Can also be done per-column in required columns array.
   */
  enableSorting?: boolean;
  fixedHeight?: CSSProperties['height'];
  fixedWidth?: CSSProperties['width'];
  tableOptions?: TanstackTableOptions<T>;
  /**
   * Sets table to use virtualized scrollable columns
   */
  scrollableColumns?: boolean;
  /**
   * Sets table to use virtualized scrollable rows rather than pagination
   */
  scrollableRows?: boolean;
  /**
   * If using expandable rows, this key will be used to identify the sub-rows
   */
  subRowKey?: string;
};

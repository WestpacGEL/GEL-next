import { ColumnDef, RowData, Table, TableOptions } from '@tanstack/react-table';
import { CSSProperties } from 'react';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteRow: (rowIndex: number) => void;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean;
  }
}

export type AdvancedColumnProps<T> = Omit<ColumnDef<T>, 'header' | 'meta' | 'id' | 'footer'> & {
  key: string;
  title: string;
  editable?: boolean;
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
  /**
   * Enables column reordering via drag and drop.
   */
  enableColumnReordering?: boolean;
  /**
   * Enables column filtering. Can also be done per-column in required columns array.
   */
  enableColumnFilter?: boolean;
  /**
   * Enables column pinning. Can also be done per-column in required columns array.
   */
  enableColumnPinning?: boolean;
  /**
   * Enables grouping of rows by column values. Can also be done per-column in required columns array.
   */
  enableGrouping?: boolean;
  /**
   * Enables all columns to be resizable. Can also be done per-column in required columns array.
   */
  enableResizing?: boolean;
  /**
   * Enables row selection.
   */
  enableRowSelection?: boolean;
  /**
   * Enables all columns to be sortable. Can also be done per-column in required columns array.
   */
  enableSorting?: boolean;
  /**
   * Used with scrollableRows. Sets fixed height for the table.
   * @default 500px
   */
  fixedHeight?: CSSProperties['height'];
  /**
   * Used with scrollableColumns. Sets fixed width for the table.
   * @default 700px
   */
  fixedWidth?: CSSProperties['width'];
  /**
   * For use with editable cells/removable rows. Returns the updated data.
   */
  onDataChange?: (data: T[]) => void;
  /**
   * Provides user with the table instance when it's ready for custom use cases.
   */
  onTableReady?: (table: Table<T>) => void;
  /**
   * Modified tanstack table options.
   */
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

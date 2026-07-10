import { ColumnDef, Row, RowData, Table, TableOptions } from '@tanstack/react-table';
import { CSSProperties, ReactNode } from 'react';

import { AdvancedTableEmptyStateProps } from './components/advanced-table-empty-state/advanced-table-empty-state.types.js';

declare module '@tanstack/react-table' {
  // using interface for below as required by Tanstack table
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteRow: (rowIndex: number) => void;
  }
  // using interface for below as required by Tanstack table
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
  | 'enableRowPinning'
  | 'onRowPinningChange'
>;

export type AdvancedTableProps<T> = {
  /**
   * Displays border around table and between columns.
   */
  bordered?: boolean;
  /**
   * The data to be displayed in the table should share type passed to table
   */
  data: T[];
  /**
   * Column information for table
   */
  columns: AdvancedColumnProps<T>[];
  /**
   * Optional identifier for the table. ID is also prepended to every row's id.
   */
  id?: string;
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
   * Enables row pinning. Adds a pin column to pin rows to the top of the table.
   */
  enableRowPinning?: boolean;
  /**
   * Row IDs to pin to the top on initial render. Requires enableRowPinning.
   * Row IDs default to their index as a string (e.g. '0', '3').
   */
  initialPinnedRows?: string[];
  /**
   * Enables row selection.
   */
  enableRowSelection?: boolean;
  /**
   * Enables all columns to be sortable. Can also be done per-column in required columns array.
   */
  enableSorting?: boolean;
  /**
   * Add extra spacing to table cells and header. Default is 12px, extra is 18px
   */
  extraCellPadding?: boolean;
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
   * Props to control pagination.
   * @default { pageIndex: 0, pageSize: 10 }
   */
  paginationProps?: {
    // Default page index (0-based)
    pageIndex?: number;
    // Default number of items per page
    pageSize?: number;
  };
  /**
   * Options for page size selection in pagination select.
   * @default [5, 10, 20, 50]
   */
  pageSizeOptions?: number[];
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
   * Whether pagination is displayed or not
   */
  showPagination?: boolean;
  /**
   * Whether to show a striped variant of the table, which adds a background color to even rows for better readability.
   */
  striped?: boolean;
  /**
   * If using expandable rows, this key will be used to identify the sub-rows
   */
  subRowKey?: string;
  /**
   * Renders a detail panel below a row when expanded, spanning the full table width.
   * Use for displaying content unrelated to the table columns (e.g. additional information, forms).
   * When provided, all rows are expandable by default unless `getRowCanExpand` is also provided.
   */
  renderDetailPanel?: (row: Row<T>) => ReactNode;
  /**
   * Controls which rows can be expanded to show a detail panel.
   * Only used when `renderDetailPanel` is provided.
   * Defaults to `() => true` (all rows expandable)
   */
  getRowCanExpand?: (row: Row<T>) => boolean;
  /**
   * Configures the empty state shown when `data` is empty.
   * Provide at minimum a `title`. `description` and `icon` are optional.
   */
  emptyState?: AdvancedTableEmptyStateProps;
  /**
   * When `true`, the table stretches to fill its parent container (`width: 100%`).
   * When `false`, the table uses its own width:
   *   - the sum of column sizes when virtualization is off, or
   *   - `fixedWidth` when `scrollableColumns` is enabled.
   * For virtualized modes (`scrollableColumns`/`scrollableRows`), `fillContainer`
   * applies to the outer scroll container — the inner table keeps its pixel
   * width so horizontal scrolling still works.
   * @default true
   */
  fillContainer?: boolean;
  /**
   * Called when virtualized rows are enabled and the user scrolls to (or near) the
   * bottom of the table — typically used to fetch the next page of rows.
   * Only fires when `scrollableRows` is enabled.
   */
  onLoadMore?: () => void;
  /**
   * Set to `true` while the consumer is fetching more rows. While truthy,
   * `onLoadMore` will not be called again — preventing duplicate requests.
   * @default false
   */
  isLoadingMore?: boolean;
  /**
   * How many rows from the bottom should trigger `onLoadMore`. A value of `0`
   * means "fire when the very last row is rendered". Increase to fetch sooner.
   * @default 0
   */
  loadMoreThreshold?: number;
};

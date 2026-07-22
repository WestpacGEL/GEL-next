import { ReactNode } from 'react';

import { AdvancedTableEmptyStateProps, AdvancedTableLoadingStateProps } from './components/index.js';

/**
 * A leaf column that reads a value from the row via `key`.
 * Distributes over `keyof T` so `render` receives the exact type of the field
 * `key` accesses, keys autocomplete, and a `key` not in `T` is a compile error.
 */
/** Fields shared by both the pixel-width and percentage-width shapes of a leaf column. */
type AdvancedTableLeafColumnCommon<T, K extends keyof T> = {
  /**
   * Cell content alignment applied to both this column's header cell and every body cell.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Opts this column into filtering. Only takes effect when the table also has
   * `enableColumnFilter`: set to `true` to add this column's filter menu.
   */
  enableColumnFilter?: boolean;
  /**
   * Opts this column into grouping. Only takes effect when the table also has
   * `enableGrouping`: set to `true` to add this column's group menu item.
   */
  enableGrouping?: boolean;
  /**
   * Opts this column into pinning. Only takes effect when the table also has
   * `enableColumnPinning`: set to `true` to add this column's pin menu items.
   */
  enablePinning?: boolean;
  /**
   * Opts this column out of resizing. Only meaningful when the table has
   * `enableColumnResizing`. Set to `false` to remove this column's resize handle.
   * Columns percentage-width cannot be resized and will not show a resize handle.
   */
  enableResizing?: boolean;
  /**
   * Opts this column into sorting. Only takes effect when the table also has
   * `enableSorting`: set to `true` to add this column's sort control.
   */
  enableSorting?: boolean;
  /**
   * Renders every body cell in this column as `<th scope="row">`, a secondary row header for the table's most important column.
   * Only set a maximum of one column to use `isRowheader` or table readability issues will occur.
   */
  isRowHeader?: boolean;
  /** Accessor into the row. Must be a key of `T`. */
  key: K;
  /**
   * Text-overflow treatment for this column's body cells.
   *
   * `'wrap'` allows content to wrap onto multiple lines, breaking even an
   * unbreakable token (e.g. a long URL) rather than overflowing the column.
   *
   * `'truncate'` clips the default (non-`render`) cell content to a single
   * ellipsised line instead.
   *
   * `'none'` removes any overflow stylings. Useful for custom render content.
   * @default 'wrap'
   */
  overflow?: 'none' | 'truncate' | 'wrap';
  /** Custom cell renderer. Receives the typed cell value and the full row. */
  render?: (value: T[K], row: T) => ReactNode;
  /** Visible column heading. */
  title: string;
};

// Split type of resizable static widths with percentage widths
export type AdvancedTableLeafColumn<T> = {
  [K in keyof T]:
    | (AdvancedTableLeafColumnCommon<T, K> & {
        /** Minimum width in pixels a user can resize this column to. Falls back to a small table-wide default when unset. */
        minWidth?: number;
        /** Default column width in pixels, and the width `resetSize()` restores. */
        width?: number;
      })
    | (AdvancedTableLeafColumnCommon<T, K> & {
        minWidth?: never;
        /**
         * A percentage of the table's own width (e.g. `'20%'`), rendered as a
         * literal `<col style={{ width }}>` rather than through TanStack's
         * numeric sizing.
         *
         * Unsupported in combination with column pinning: a pinned column's
         * sticky offset is computed by summing preceding/following columns',
         * so it cannot be accurately calculated.
         */
        width: `${number}%`;
      });
}[keyof T];

/**
 * A grouped (multi-level) header column. Its `key` is a plain identifier — a
 * parent heading does not access a field and it must declare child `columns`.
 * Advanced tables does support nested columns but has no examples.
 */
export type AdvancedTableGroupColumn<T> = {
  /** Child columns rendered beneath this group heading. */
  columns: AdvancedTableColumn<T>[];
  /** Identifier for the group header (not a row accessor). */
  key: string;
  /** Visible group heading. */
  title: string;
};

/**
 * A column definition for {@link AdvancedTable}: leaf and/or trunk columns
 */
export type AdvancedTableColumn<T> = AdvancedTableLeafColumn<T> | AdvancedTableGroupColumn<T>;

/**
 * A stable-identity accessor for a row: a key of `T` whose value is used as the
 * row's id, or a function computing an id string from the row. Required for when
 * row selection is enabled.
 *
 * The resolved id must be unique per row — the table does not validate this (user responsibility).
 */
export type AdvancedTableRowKey<T> = keyof T | ((row: T) => string);

/** A single column sort: the sorted column's `key` and its direction. */
export type AdvancedTableColumnSort = {
  /** `true` for descending, `false` for ascending. */
  desc: boolean;
  /** The sorted column's `key`. */
  id: string;
};

/** The table's sort state: an ordered list of column sorts.*/
export type AdvancedTableSortingState = AdvancedTableColumnSort[];

/**
 * The table's pagination state.
 */
export type AdvancedTablePaginationState = {
  /** Zero-based index of the current page. */
  pageIndex: number;
  /** Number of rows shown per page. */
  pageSize: number;
};

/** A single column's filter value, set via its column menu's filter input. */
export type AdvancedTableColumnFilter = {
  /** The filtered column's `key`. */
  id: string;
  /** The filter text. */
  value: string;
};

/**The table's column-filter state: an ordered list of per-column filters. */
export type AdvancedTableColumnFiltersState = AdvancedTableColumnFilter[];

/**The table's column-pinning state: the ids of columns pinned to each edge. */
export type AdvancedTableColumnPinningState = {
  /** Ids of columns pinned to the left edge, in display order. */
  left?: string[];
  /** Ids of columns pinned to the right edge, in display order. */
  right?: string[];
};

/**
 * The table's grouping state: an ordered list of grouped column ids. Only ever
 * holds 0 or 1 entries, currently supporting single grouping.
 */
export type AdvancedTableGroupingState = string[];

/**
 * The table's column-sizing state: current widths in pixels, keyed by leaf
 * column id. Only columns a user has actually resized need an entry — any
 * column missing from the map renders at its configured `width` or by TanStack table.
 */
export type AdvancedTableColumnSizingState = Record<string, number>;

/**
 * The table's column-order state: every non-reserved leaf column's `key`, in
 * display order. Excludes selection/pin columns.
 */
export type AdvancedTableColumnOrderState = string[];

/**
 * The table's expansion state: ids of currently-expanded rows, or the literal
 * `true` sentinel meaning every row starts expanded.
 */
export type AdvancedTableExpandedState = string[] | true;

/**
 * The table's row-pinning state: ids (derived from `rowKey`) of top-level rows
 * currently pinned to the top of the table. Only ever holds top-level ids —
 * pinning a row pins (design choice) its sub-rows are pinned too but not stored
 * Top pinning only: there is no bottom-pinning concept in this table.
 */
export type AdvancedTablePinnedRowsState = string[];

type AdvancedTableBaseProps<T> = {
  /**
   * Row-background treatment. `transparent` (default) applies a hover highlight
   * only, `striped` alternates row backgrounds, `filled` fills every row with a
   * single colour.
   * @default 'transparent'
   */
  background?: 'transparent' | 'striped' | 'filled';
  /** Draws additional borders around the table and between every column. */
  bordered?: boolean;
  /**
   * Current column-filter state (controlled). Pair with `onColumnFiltersChange`
   * to own filtering. Use `defaultColumnFilters` instead for uncontrolled usage.
   */
  columnFilters?: AdvancedTableColumnFiltersState;
  /**
   * Current column-order state (controlled). Pair with `onColumnOrderChange`
   * to own column order. Use `defaultColumnOrder` instead for uncontrolled
   * usage.
   */
  columnOrder?: AdvancedTableColumnOrderState;
  /**
   * Current column-pinning state (controlled). Pair with `onColumnPinningChange`
   * to own pinning. Use `defaultColumnPinning` instead for uncontrolled usage.
   */
  columnPinning?: AdvancedTableColumnPinningState;
  /** Column definitions for the table. */
  columns: AdvancedTableColumn<T>[];
  /**
   * Current column-sizing state (controlled). Pair with `onColumnSizingChange`
   * to own column widths. Use `defaultColumnSizing` instead for uncontrolled
   * usage.
   */
  columnSizing?: AdvancedTableColumnSizingState;
  /**
   * The rows to render (controlled). Pair with `onDataChange` to own the data.
   * Use `defaultData` instead for uncontrolled usage.
   */
  data?: T[];
  /**
   * Initial column-filter state when the table manages its own filtering
   * (uncontrolled).
   */
  defaultColumnFilters?: AdvancedTableColumnFiltersState;
  /**
   * Initial column-order state when the table manages its own order
   * (uncontrolled). Defaults to the order columns are defined in.
   */
  defaultColumnOrder?: AdvancedTableColumnOrderState;
  /**
   * Initial column-pinning state when the table manages its own pinning
   * (uncontrolled).
   */
  defaultColumnPinning?: AdvancedTableColumnPinningState;
  /**
   * Initial column-sizing state when the table manages its own widths
   * (uncontrolled). Defaults to each column's configured `width`.
   */
  defaultColumnSizing?: AdvancedTableColumnSizingState;
  /** Initial rows when the table manages its own data (uncontrolled). */
  defaultData?: T[];
  /**
   * Initial grouping state when the table manages its own grouping
   * (uncontrolled).
   */
  defaultGrouping?: AdvancedTableGroupingState;
  /**
   * Initial pagination state when the table manages its own paging (uncontrolled).
   * @default { pageIndex: 0, pageSize: 10 }
   */
  defaultPagination?: AdvancedTablePaginationState;
  /**
   * Initial sort state when the table manages its own sorting (uncontrolled).
   * Table will default to TanStack sorting defaults.
   */
  defaultSorting?: AdvancedTableSortingState;
  /**
   * Configures the empty state shown when `data` is empty.
   */
  emptyState?: AdvancedTableEmptyStateProps;
  /**
   * Enables the per-column filter input in each column's menu. Individual
   * columns must opt in with their own `enableColumnFilter: true` — this flag
   * alone does not make any column filterable.
   * @default false
   */
  enableColumnFilter?: boolean;
  /**
   * Enables pin left / pin right / unpin actions in non-reserved column menus.
   * A column must opt in with its own `enablePinning: true` — this flag alone
   * does not make any column pinnable.
   * @default false
   */
  enableColumnPinning?: boolean;
  /**
   * Enables reordering columns by dragging a header, via the keyboard, or via
   * "Move left" / "Move right" actions in the column menu. The reserved
   * selection/pin columns always stay first and are never reorderable.
   * @default false
   */
  enableColumnReordering?: boolean;
  /**
   * Enables resizing all columns by dragging the handle at a head cell's edge, or via
   * the keyboard once the handle is focused. Individual columns can opt out with their own `enableResizing: false`.
   * @default false
   */
  enableColumnResizing?: boolean;
  /**
   * Enables group/ungroup actions in column menus. A column must opt in with
   * its own `enableGrouping: true` — this flag alone does not make any column
   * groupable. Only one column can be grouped at a time; grouping by a new
   * column replaces the previous grouping.
   * @default false
   */
  enableGrouping?: boolean;
  /**
   * Enables client-side pagination, on by default. Set to `false` to render
   * every row at once.
   * @default true
   */
  enablePagination?: boolean;
  /**
   * Enables click-to-sort in header columns. Individual columns must opt in with their own
   * `enableSorting: true`.
   * @default false
   */
  enableSorting?: boolean;
  /**
   * When `true` (default) the table stretches to fill its parent container.
   * @default true
   */
  fillContainer?: boolean;
  /**
   * Current grouping state (controlled). Pair with `onGroupingChange` to own
   * grouping. Use `defaultGrouping` instead for uncontrolled usage.
   */
  grouping?: AdvancedTableGroupingState;
  /**
   * Optional HTML `id` for the table. Also prefixes generated row/element ids. If
   * an `id` is not presented, tables will generate one.
   */
  id?: string;
  /**
   * Shows a loading treatment: a centered indicator replacing the rows when
   * there's no data yet, or a dimmed overlay across the whole table when rows
   * are already present. Table-level controls are disabled while `true`.
   * @default false
   */
  loading?: boolean;
  /**
   * Configures the loading state shown while `loading` is `true`.
   */
  loadingStateProps?: AdvancedTableLoadingStateProps;
  /**
   * If set to `true`, the consumer is responsible for supplying
   * pre-filtered `data` (typically in response to `onColumnFiltersChange`). Filter
   * controls and announcements still render. Useful for API query filtering.
   * @default false
   */
  manualFiltering?: boolean;
  /**
   * When `true` the table does **not** slice `data` itself — it renders exactly the rows it's given and only tracks
   * `pagination` state, emitting `onPaginationChange`. Pair with `rowCount` so page count, the row-range summary,
   * and Next/Prev availability stay accurate.
   * @default false
   */
  manualPagination?: boolean;
  /**
   * When `true` the table does **not** reorder rows itself — it only tracks the sort state
   * and emits `onSortingChange`; the consumer is responsible for supplying pre-sorted `data`
   * (typically in an API response to that callback). Sort controls, `aria-sort`, and
   * announcements still render.
   * @default false
   */
  manualSorting?: boolean;
  /** Called with the next column-filter state whenever the user changes a filter. */
  onColumnFiltersChange?: (columnFilters: AdvancedTableColumnFiltersState) => void;
  /** Called with the next column order whenever the user reorders a column. */
  onColumnOrderChange?: (columnOrder: AdvancedTableColumnOrderState) => void;
  /** Called with the next column-pinning state whenever the user pins or unpins a column. */
  onColumnPinningChange?: (pinning: AdvancedTableColumnPinningState) => void;
  /** Called with the next column-sizing state whenever the user resizes a column. */
  onColumnSizingChange?: (columnSizing: AdvancedTableColumnSizingState) => void;
  /** Called with the next data when the table mutates rows. */
  onDataChange?: (data: T[]) => void;
  /** Called with the next grouping state whenever the user groups or ungroups a column. */
  onGroupingChange?: (grouping: AdvancedTableGroupingState) => void;
  /** Called with the next pagination state whenever the page or page size changes. */
  onPaginationChange?: (pagination: AdvancedTablePaginationState) => void;
  /** Called with the next sort state whenever the user changes sorting. */
  onSortingChange?: (sorting: AdvancedTableSortingState) => void;
  /**
   * Cell padding density for table cells.
   * @default 'default'
   */
  padding?: 'default' | 'large';
  /**
   * Selectable page sizes offered in the page-size selector.
   * @default [5, 10, 20, 50]
   */
  pageSizeOptions?: number[];
  /**
   * Current pagination state (controlled). Pair with `onPaginationChange` to control
   * paging. Use `defaultPagination` instead for uncontrolled usage.
   */
  pagination?: AdvancedTablePaginationState;
  /**
   * Total row count across all pages. Only meaningful with `manualPagination`. Controls the row-range summary
   * ("21–30 of 214"), and Next/Prev availability.
   */
  rowCount?: number;
  /**
   * Current sort state (controlled). Pair with `onSortingChange` to own sorting.
   * Use `defaultSorting` instead for uncontrolled usage.
   */
  sorting?: AdvancedTableSortingState;
  /**
   * `'fixed'` (the default) gives every column an enforced, exact width via `table-layout: fixed` and
   *  a `<colgroup>` — required for column pinning. `'auto'` letting the browser expand a column past its
   * configured width for content that can't shrink.
   * @default 'fixed'
   */
  tableLayout?: 'fixed' | 'auto';
};

/**
 * No reserved-column feature is enabled: `rowKey` stays optional since there is
 * no row state that needs a stable id yet.
 */
type AdvancedTableNoRowIdentityProps<T> = AdvancedTableBaseProps<T> & {
  defaultExpanded?: never;
  defaultPinnedRows?: never;
  defaultSelectedRows?: never;
  /** @default false */
  enableRowPinning?: false;
  /** @default false */
  enableRowSelection?: false;
  expanded?: never;
  getRowCanExpand?: never;
  onExpandedChange?: never;
  onPinnedRowsChange?: never;
  onSelectionChange?: never;
  pinnedRows?: never;
  renderDetailPanel?: never;
  /** Row-identity accessor. Optional here — no feature requires it yet. */
  rowKey?: AdvancedTableRowKey<T>;
  selectedRows?: never;
};

/**
 * Row selection and row pinning is enabled: `rowKey` becomes required so selection is keyed by a stable id.
 */
type AdvancedTableRowIdentityProps<T> = AdvancedTableBaseProps<T> & {
  /**
   * Initial expansion state when the table manages its own expansion
   * (uncontrolled). Defaults to `true` (every row expanded) when `enableGrouping`
   * is set, so a newly-grouped column's rows start visible; otherwise defaults
   * to none expanded.
   */
  defaultExpanded?: AdvancedTableExpandedState;
  /** Initial pinned row ids when the table manages its own pinning (uncontrolled). */
  defaultPinnedRows?: AdvancedTablePinnedRowsState;
  /** Initial selected row ids when the table manages its own selection (uncontrolled). */
  defaultSelectedRows?: string[];
  /**
   * Renders a pin toggle in the reserved leading column, letting a user lift a
   * row (and its sub-rows) into a pinned section above the body. Requires
   * `rowKey`.
   * @default false
   */
  enableRowPinning?: boolean;
  /**
   * Renders a checkbox per row and a select-all checkbox in the header.
   * Requires `rowKey`.
   * @default false
   */
  enableRowSelection?: boolean;
  /**
   * Passing `expanded` enables you to manage the expanded state (controlled).
   * Pair with `onExpandedChange` to own expansion. Use `defaultExpanded`
   * instead for uncontrolled usage.
   *
   * Row expansion is always available — no `enableExpanding` flag exists. Any
   * row whose data includes a `subRows: T[]` array can expand to reveal them,
   * and `getRowCanExpand` / `renderDetailPanel` extend or restrict this further.
   */
  expanded?: AdvancedTableExpandedState;
  /**
   * Controls which rows offer expansion. Receives the row's data and its
   * nesting depth. Defaults to rows with `subRows`, or — when `renderDetailPanel`
   * is set.
   */
  getRowCanExpand?: (row: T, info: { depth: number }) => boolean;
  /** Called with the next expansion state whenever the user expands or collapses a row. */
  onExpandedChange?: (expanded: AdvancedTableExpandedState) => void;
  /** Called with the next pinned row ids whenever the user pins or unpins a row. */
  onPinnedRowsChange?: (rowIds: AdvancedTablePinnedRowsState) => void;
  /** Called with the next selected row ids whenever the user changes selection. */
  onSelectionChange?: (rowIds: string[]) => void;
  /**
   * Currently pinned rows, as stable top-level ids derived from `rowKey`
   * (controlled) — pinning a row pins its sub-rows too, but only the parent id
   * needs to be listed. Pair with `onPinnedRowsChange` to own pinning. Use
   * `defaultPinnedRows` instead for uncontrolled usage.
   */
  pinnedRows?: AdvancedTablePinnedRowsState;
  /**
   * Renders custom content beneath an expanded row, as a full-width cell
   * inside a valid table row. Receives the row's data and its nesting depth.
   */
  renderDetailPanel?: (row: T, info: { depth: number }) => ReactNode;
  /** Row-identity accessor, required once `enableRowSelection` is set. */
  rowKey: AdvancedTableRowKey<T>;
  /**
   * Currently selected rows, as stable ids derived from `rowKey` (controlled).
   * Pair with `onSelectionChange` to own selection. Use `defaultSelectedRows`
   * instead for uncontrolled usage.
   */
  selectedRows?: string[];
};

/**
 * The table's accessible name comes from exactly one source: a `caption`, an `aria-labelledby`
 * or neither. Passing both `caption` and `aria-labelledby` should be a compile error.
 */
type AdvancedTableCaptionProps =
  | {
      'aria-labelledby'?: never;
      /** Accessible name for the table, rendered as a `<caption>`. */
      caption?: string;
      /**
       * Visually shows the `caption`. When `false` (the default), the caption is
       * still rendered — so the table has an accessible name for screen readers —
       * but is visually hidden.
       * @default false
       */
      showCaption?: boolean;
    }
  | {
      /** Points to the id of an element elsewhere on the page to use as the table's accessible name, instead of `caption`. */
      'aria-labelledby'?: string;
      caption?: never;
      showCaption?: never;
    };

export type AdvancedTableProps<T> = (AdvancedTableNoRowIdentityProps<T> | AdvancedTableRowIdentityProps<T>) &
  AdvancedTableCaptionProps;

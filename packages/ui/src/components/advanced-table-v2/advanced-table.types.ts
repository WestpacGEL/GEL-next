import { ReactNode } from 'react';

import { AdvancedTableEmptyStateProps, AdvancedTableLoadingStateProps } from './components/index.js';

/**
 * A leaf column that reads a value from the row via `key`.
 * Distributes over `keyof T` so `render` receives the exact type of the field
 * `key` accesses, keys autocomplete, and a `key` not in `T` is a compile error.
 */
export type AdvancedTableLeafColumn<T> = {
  [K in keyof T]: {
    /** Accessor into the row. Must be a key of `T`. */
    key: K;
    /** Visible column heading. */
    title: string;
    /** Custom cell renderer. Receives the typed cell value and the full row. */
    render?: (value: T[K], row: T) => ReactNode;
    /**
     * Opts this column into sorting. Only takes effect when the table also has
     * `enableSorting`: set to `true` to add this column's sort control.
     */
    enableSorting?: boolean;
    /**
     * Opts this column into filtering. Only takes effect when the table also has
     * `enableColumnFilter`: set to `true` to add this column's filter menu.
     */
    enableColumnFilter?: boolean;
    /**
     * Opts this column into pinning. Only takes effect when the table also has
     * `enableColumnPinning`: set to `true` to add this column's pin menu items.
     */
    enablePinning?: boolean;
    /**
     * Opts this column into grouping. Only takes effect when the table also has
     * `enableGrouping`: set to `true` to add this column's group menu item.
     */
    enableGrouping?: boolean;
    /**
     * Opts this column out of resizing. Only meaningful when the table has
     * `enableColumnResizing`: set to `false` to remove this column's resize handle.
     */
    enableResizing?: boolean;
    /** Marks the column editable. Consumed by the editable-cells feature (later ticket). */
    editable?: boolean;
    /** Default column width in pixels, and the width `resetSize()` restores. */
    width?: number;
    /** Minimum width in pixels a user can resize this column to. Falls back to a small table-wide default when unset. */
    minWidth?: number;
  };
}[keyof T];

/**
 * A grouped (multi-level) header column. Its `key` is a plain identifier — a
 * parent heading does not access a field — and it must declare child `columns`.
 */
export type AdvancedTableGroupColumn<T> = {
  /** Identifier for the group header (not a row accessor). */
  key: string;
  /** Visible group heading. */
  title: string;
  /** Child columns rendered beneath this group heading. */
  columns: AdvancedTableColumn<T>[];
};

/**
 * A column definition for {@link AdvancedTable}: either a leaf column that reads
 * a field from the row, or a group column that bands child columns under a heading.
 */
export type AdvancedTableColumn<T> = AdvancedTableLeafColumn<T> | AdvancedTableGroupColumn<T>;

/**
 * A stable-identity accessor for a row: a key of `T` whose value is used as the
 * row's id, or a function computing an id string from the row. Required whenever
 * row selection (and, in later tickets, pinning or expansion) is enabled, so row
 * state is always keyed by a stable id, never array index.
 *
 * The resolved id must be unique per row — the table does not validate this.
 * Two rows resolving to the same id will share selection (and other row) state.
 */
export type AdvancedTableRowKey<T> = keyof T | ((row: T) => string);

/** A single column sort: the sorted column's `key` and its direction. */
export type AdvancedTableColumnSort = {
  /** The sorted column's `key`. */
  id: string;
  /** `true` for descending, `false` for ascending. */
  desc: boolean;
};

/**
 * The table's sort state: an ordered list of column sorts. A public, GEL-owned
 * contract — the internal table engine is never exposed.
 */
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

/**
 * The table's column-filter state: an ordered list of per-column filters. A
 * public, GEL-owned contract — the internal table engine is never exposed.
 */
export type AdvancedTableColumnFiltersState = AdvancedTableColumnFilter[];

/**
 * The table's column-pinning state: the ids of columns pinned to each edge.
 * A public, GEL-owned contract — the internal table engine is never exposed.
 */
export type AdvancedTableColumnPinningState = {
  /** Ids of columns pinned to the left edge, in display order. */
  left?: string[];
  /** Ids of columns pinned to the right edge, in display order. */
  right?: string[];
};

/**
 * The table's grouping state: an ordered list of grouped column ids. Only ever
 * holds 0 or 1 entries — this table supports grouping by a single column at a
 * time. A public, GEL-owned contract — the internal table engine is never exposed.
 */
export type AdvancedTableGroupingState = string[];

/**
 * The table's column-sizing state: current widths in pixels, keyed by leaf
 * column id. Only columns a user has actually resized need an entry — any
 * column missing from the map renders at its configured `width` (or TanStack's
 * own default). A public, GEL-owned contract — the internal table engine is
 * never exposed.
 */
export type AdvancedTableColumnSizingState = Record<string, number>;

/**
 * The table's column-order state: every non-reserved leaf column's `key`, in
 * display order. Reordering a banded group column moves its nested leaves
 * together as one contiguous block, but each leaf's own id still appears here
 * individually (there is no separate entry for the group itself). The
 * reserved selection/pin columns are never included; they always render first.
 * A public, GEL-owned contract — the internal table engine is never exposed.
 */
export type AdvancedTableColumnOrderState = string[];

/**
 * The table's expansion state: ids of currently-expanded rows, or the literal
 * `true` sentinel meaning every row starts expanded (used e.g. as grouping's
 * implicit default so group headers open with their children visible).
 */
export type AdvancedTableExpandedState = string[] | true;

/**
 * The table's row-pinning state: ids (derived from `rowKey`) of top-level rows
 * currently pinned to the top of the table. Only ever holds top-level ids —
 * pinning a row pins its sub-rows too, but they're never listed here
 * individually (see utils/pinned-rows.ts). A public, GEL-owned contract — the
 * internal table engine is never exposed. Top only: there is no bottom-pinning
 * concept in this table.
 */
export type AdvancedTablePinnedRowsState = string[];

type AdvancedTableBaseProps<T> = {
  /** Column definitions for the table. */
  columns: AdvancedTableColumn<T>[];
  /**
   * The rows to render (controlled). Pair with `onDataChange` to own the data.
   * Use `defaultData` instead for uncontrolled usage.
   */
  data?: T[];
  /** Initial rows when the table manages its own data (uncontrolled). */
  defaultData?: T[];
  /** Called with the next data when the table mutates rows (e.g. edits, deletions). */
  onDataChange?: (data: T[]) => void;
  /** Optional id for the table. Also prefixes generated row/element ids. */
  id?: string;
  /**
   * Enables click-to-sort. Individual columns must opt in with their own
   * `enableSorting: true`.
   * @default false
   */
  enableSorting?: boolean;
  /**
   * Current sort state (controlled). Pair with `onSortingChange` to own sorting.
   * Use `defaultSorting` instead for uncontrolled usage.
   */
  sorting?: AdvancedTableSortingState;
  /**
   * Initial sort state when the table manages its own sorting (uncontrolled).
   * Table will default to TanStack sorting defaults.
   */
  defaultSorting?: AdvancedTableSortingState;
  /** Called with the next sort state whenever the user changes sorting. */
  onSortingChange?: (sorting: AdvancedTableSortingState) => void;
  /**
   * TODO: determine if required
   * Manual (server-side) sorting. When `true` the table does **not** reorder rows
   * itself — it only tracks the sort state and emits `onSortingChange`; the
   * consumer is responsible for supplying pre-sorted `data` (typically in response
   * to that callback). Sort controls, `aria-sort`, and announcements still render.
   * @default false
   */
  manualSorting?: boolean;
  /**
   * Enables client-side pagination, on by default. Set to `false` to render
   * every row at once.
   * @default true
   */
  enablePagination?: boolean;
  /**
   * Current pagination state (controlled). Pair with `onPaginationChange` to control
   * paging. Use `defaultPagination` instead for uncontrolled usage.
   */
  pagination?: AdvancedTablePaginationState;
  /**
   * Initial pagination state when the table manages its own paging (uncontrolled).
   * @default { pageIndex: 0, pageSize: 10 }
   */
  defaultPagination?: AdvancedTablePaginationState;
  /** Called with the next pagination state whenever the page or page size changes. */
  onPaginationChange?: (pagination: AdvancedTablePaginationState) => void;
  /**
   * When `true` the table does **not** slice `data` itself — it renders exactly the rows it's given and only tracks
   * `pagination` state, emitting `onPaginationChange`. Pair with `rowCount` so page count, the row-range summary,
   * and Next/Prev availability stay accurate.
   * @default false
   */
  manualPagination?: boolean;
  /**
   * Total row count across all pages. Only meaningful with `manualPagination`. Controls the row-range summary
   * ("21–30 of 214"), and Next/Prev availability.
   */
  rowCount?: number;
  /**
   * Selectable page sizes offered in the page-size selector.
   * @default [5, 10, 20, 50]
   */
  pageSizeOptions?: number[];
  /**
   * Enables the per-column filter input in each column's menu. Individual
   * columns must opt in with their own `enableColumnFilter: true` — this flag
   * alone does not make any column filterable.
   * @default false
   */
  enableColumnFilter?: boolean;
  /**
   * Current column-filter state (controlled). Pair with `onColumnFiltersChange`
   * to own filtering. Use `defaultColumnFilters` instead for uncontrolled usage.
   */
  columnFilters?: AdvancedTableColumnFiltersState;
  /**
   * Initial column-filter state when the table manages its own filtering
   * (uncontrolled).
   */
  defaultColumnFilters?: AdvancedTableColumnFiltersState;
  /** Called with the next column-filter state whenever the user changes a filter. */
  onColumnFiltersChange?: (columnFilters: AdvancedTableColumnFiltersState) => void;
  /**
   * If set to `true`, the consumer is responsible for supplying
   * pre-filtered `data` (typically in response to `onColumnFiltersChange`). Filter
   * controls and announcements still render. Useful for API query filtering.
   * @default false
   */
  manualFiltering?: boolean;
  /**
   * Enables pin left / pin right / unpin actions in non-reserved column menus.
   * A column must opt in with its own `enablePinning: true` — this flag alone
   * does not make any column pinnable.
   * @default false
   */
  enableColumnPinning?: boolean;
  /**
   * Current column-pinning state (controlled). Pair with `onColumnPinningChange`
   * to own pinning. Use `defaultColumnPinning` instead for uncontrolled usage.
   */
  columnPinning?: AdvancedTableColumnPinningState;
  /**
   * Initial column-pinning state when the table manages its own pinning
   * (uncontrolled).
   */
  defaultColumnPinning?: AdvancedTableColumnPinningState;
  /** Called with the next column-pinning state whenever the user pins or unpins a column. */
  onColumnPinningChange?: (pinning: AdvancedTableColumnPinningState) => void;
  /**
   * Enables group/ungroup actions in column menus. A column must opt in with
   * its own `enableGrouping: true` — this flag alone does not make any column
   * groupable. Only one column can be grouped at a time; grouping by a new
   * column replaces the previous grouping.
   * @default false
   */
  enableGrouping?: boolean;
  /**
   * Current grouping state (controlled). Pair with `onGroupingChange` to own
   * grouping. Use `defaultGrouping` instead for uncontrolled usage.
   */
  grouping?: AdvancedTableGroupingState;
  /**
   * Initial grouping state when the table manages its own grouping
   * (uncontrolled).
   */
  defaultGrouping?: AdvancedTableGroupingState;
  /** Called with the next grouping state whenever the user groups or ungroups a column. */
  onGroupingChange?: (grouping: AdvancedTableGroupingState) => void;
  /**
   * Enables reordering columns by dragging a header, via the keyboard, or via
   * "Move left" / "Move right" actions in the column menu. The reserved
   * selection/pin columns always stay first and are never reorderable.
   * @default false
   */
  enableColumnReordering?: boolean;
  /**
   * Current column-order state (controlled). Pair with `onColumnOrderChange`
   * to own column order. Use `defaultColumnOrder` instead for uncontrolled
   * usage.
   */
  columnOrder?: AdvancedTableColumnOrderState;
  /**
   * Initial column-order state when the table manages its own order
   * (uncontrolled). Defaults to the order columns are defined in.
   */
  defaultColumnOrder?: AdvancedTableColumnOrderState;
  /** Called with the next column order whenever the user reorders a column. */
  onColumnOrderChange?: (columnOrder: AdvancedTableColumnOrderState) => void;
  /**
   * Enables resizing all columns by dragging the handle at a head cell's edge, or via
   * the keyboard once the handle is focused. Individual columns can opt out with their own `enableResizing: false`.
   * @default false
   */
  enableColumnResizing?: boolean;
  /**
   * Current column-sizing state (controlled). Pair with `onColumnSizingChange`
   * to own column widths. Use `defaultColumnSizing` instead for uncontrolled
   * usage.
   */
  columnSizing?: AdvancedTableColumnSizingState;
  /**
   * Initial column-sizing state when the table manages its own widths
   * (uncontrolled). Defaults to each column's configured `width`.
   */
  defaultColumnSizing?: AdvancedTableColumnSizingState;
  /** Called with the next column-sizing state whenever the user resizes a column. */
  onColumnSizingChange?: (columnSizing: AdvancedTableColumnSizingState) => void;
  /**
   * Row-background treatment. `transparent` (default) applies a hover highlight
   * only, `striped` alternates row backgrounds, `filled` fills every row with a
   * single colour.
   * @default 'transparent'
   */
  background?: 'transparent' | 'striped' | 'filled';
  /**
   * Cell padding density.
   * @default 'default'
   */
  padding?: 'default' | 'large';
  /** Draws additional borders around the table and between every column. */
  bordered?: boolean;
  /**
   * When `true` (default) the table stretches to fill its parent.
   * @default true
   */
  fillContainer?: boolean;
  /**
   * Configures the empty state shown when `data` is empty.
   */
  emptyState?: AdvancedTableEmptyStateProps;
  /**
   * Shows a loading treatment: a centered indicator replacing the rows when
   * there's no data yet, or a dimmed overlay across the whole table when rows
   * are already present (e.g. a background refetch). Table-level controls
   * (sorting, column menu, pagination) are disabled while `true`.
   * @default false
   */
  loading?: boolean;
  /**
   * Configures the loading state shown while `loading` is `true`.
   */
  loadingStateProps?: AdvancedTableLoadingStateProps;
};

/**
 * No reserved-column feature is enabled: `rowKey` stays optional since there is
 * no row state that needs a stable id yet.
 */
type AdvancedTableNoRowIdentityProps<T> = AdvancedTableBaseProps<T> & {
  /** @default false */
  enableRowSelection?: false;
  /** Row-identity accessor. Optional here — no feature requires it yet. */
  rowKey?: AdvancedTableRowKey<T>;
  selectedRows?: never;
  defaultSelectedRows?: never;
  onSelectionChange?: never;
  expanded?: never;
  defaultExpanded?: never;
  onExpandedChange?: never;
  renderDetailPanel?: never;
  getRowCanExpand?: never;
  /** @default false */
  enableRowPinning?: false;
  pinnedRows?: never;
  defaultPinnedRows?: never;
  onPinnedRowsChange?: never;
};

/**
 * Row selection (or, in later tickets, row pinning/expansion) is enabled:
 * `rowKey` becomes required so selection is keyed by a stable id.
 */
type AdvancedTableRowIdentityProps<T> = AdvancedTableBaseProps<T> & {
  /**
   * Renders a checkbox per row and a select-all checkbox in the header.
   * Requires `rowKey`.
   * @default false
   */
  enableRowSelection?: boolean;
  /** Row-identity accessor, required once `enableRowSelection` is set. */
  rowKey: AdvancedTableRowKey<T>;
  /**
   * Currently selected rows, as stable ids derived from `rowKey` (controlled).
   * Pair with `onSelectionChange` to own selection. Use `defaultSelectedRows`
   * instead for uncontrolled usage.
   */
  selectedRows?: string[];
  /** Initial selected row ids when the table manages its own selection (uncontrolled). */
  defaultSelectedRows?: string[];
  /** Called with the next selected row ids whenever the user changes selection. */
  onSelectionChange?: (rowIds: string[]) => void;
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
   * Initial expansion state when the table manages its own expansion
   * (uncontrolled). Defaults to `true` (every row expanded) when `enableGrouping`
   * is set, so a newly-grouped column's rows start visible; otherwise defaults
   * to none expanded.
   */
  defaultExpanded?: AdvancedTableExpandedState;
  /** Called with the next expansion state whenever the user expands or collapses a row. */
  onExpandedChange?: (expanded: AdvancedTableExpandedState) => void;
  /**
   * Renders custom content beneath an expanded row, as a full-width cell
   * inside a valid table row. Receives the row's data and its nesting depth.
   */
  renderDetailPanel?: (row: T, info: { depth: number }) => ReactNode;
  /**
   * Controls which rows offer expansion. Receives the row's data and its
   * nesting depth. Defaults to rows with `subRows`, or — when `renderDetailPanel`
   * is set — every row (so a detail panel isn't silently blocked on leaf rows).
   */
  getRowCanExpand?: (row: T, info: { depth: number }) => boolean;
  /**
   * Renders a pin toggle in the reserved leading column, letting a user lift a
   * row (and its sub-rows) into a pinned section above the body. Requires
   * `rowKey`.
   * @default false
   */
  enableRowPinning?: boolean;
  /**
   * Currently pinned rows, as stable top-level ids derived from `rowKey`
   * (controlled) — pinning a row pins its sub-rows too, but only the parent id
   * needs to be listed. Pair with `onPinnedRowsChange` to own pinning. Use
   * `defaultPinnedRows` instead for uncontrolled usage.
   */
  pinnedRows?: AdvancedTablePinnedRowsState;
  /** Initial pinned row ids when the table manages its own pinning (uncontrolled). */
  defaultPinnedRows?: AdvancedTablePinnedRowsState;
  /** Called with the next pinned row ids whenever the user pins or unpins a row. */
  onPinnedRowsChange?: (rowIds: AdvancedTablePinnedRowsState) => void;
};

/**
 * The table's accessible name comes from exactly one source: a `caption`, an `aria-labelledby`
 * or neither. Passing both `caption` and `aria-labelledby` should be a compile error.
 */
type AdvancedTableCaptionProps =
  | {
      /** Accessible name for the table, rendered as a `<caption>`. */
      caption?: string;
      /**
       * Visually shows the `caption`. When `false` (the default), the caption is
       * still rendered — so the table has an accessible name for screen readers —
       * but is visually hidden.
       * @default false
       */
      showCaption?: boolean;
      'aria-labelledby'?: never;
    }
  | {
      caption?: never;
      showCaption?: never;
      /** Points to the id of an element elsewhere on the page to use as the table's accessible name, instead of `caption`. */
      'aria-labelledby'?: string;
    };

export type AdvancedTableProps<T> = (AdvancedTableNoRowIdentityProps<T> | AdvancedTableRowIdentityProps<T>) &
  AdvancedTableCaptionProps;

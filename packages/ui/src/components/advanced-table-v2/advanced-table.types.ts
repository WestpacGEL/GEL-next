import { ReactNode } from 'react';

import { AdvancedTableEmptyStateProps } from './components/index.js';

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
     * Opts this column out of sorting. Only meaningful when the table has
     * `enableSorting`: set to `false` to remove this column's sort control.
     */
    enableSorting?: boolean;
    /**
     * Opts this column out of filtering. Only meaningful when the table has
     * `enableColumnFilter`: set to `false` to remove this column's filter menu.
     */
    enableColumnFilter?: boolean;
    /** Marks the column editable. Consumed by the editable-cells feature (later ticket). */
    editable?: boolean;
    /** Default column width in pixels. Consumed by the resizing feature (later ticket). */
    width?: number;
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
  /**
   * Accessible name for the table, rendered as a `<caption>`. Optional — when
   * omitted no caption is rendered and the table relies on surrounding context
   * for its name.
   */
  caption?: string;
  /**
   * Visually hides the `caption` while keeping it in the accessibility tree, so
   * the table retains an accessible name for screen readers without showing it.
   * @default false
   */
  hideCaption?: boolean;
  /** Optional id for the table. Also prefixes generated row/element ids. */
  id?: string;
  /**
   * Enables click-to-sort on every column. Individual columns can opt out with
   * their own `enableSorting: false`.
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
   * Selectable page sizes offered in the page-size selector.
   * @default [5, 10, 20, 50]
   */
  pageSizeOptions?: number[];
  /**
   * Enables the per-column filter input in each column's menu. Individual
   * columns can opt out with their own `enableColumnFilter: false`.
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
};

export type AdvancedTableProps<T> = AdvancedTableNoRowIdentityProps<T> | AdvancedTableRowIdentityProps<T>;

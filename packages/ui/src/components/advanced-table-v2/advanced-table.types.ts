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

export type AdvancedTableProps<T> = {
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
  /** Optional id for the table. Also prefixes generated row/element ids. */
  id?: string;
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

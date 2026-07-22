import { ColumnDef, RowData } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { AdvancedTableColumn, AdvancedTableGroupColumn } from '../advanced-table.types.js';
import { AdvancedTableExpandCellContent } from '../components/advanced-table-expand-cell-content/index.js';

import { getExpandButtonA11yProps } from './expand-button-a11y.js';

declare module '@tanstack/react-table' {
  // using interface for below as required by Tanstack table
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Per-column text alignment; read by AdvancedTableCell/AdvancedTableHeaderCell. */
    align?: 'left' | 'center' | 'right';
    /** Per-column text-overflow treatment; read by AdvancedTableCell. */
    overflow?: 'none' | 'truncate' | 'wrap';
    /**
     * True when this leaf column renders as `<th scope="row">` (its `isRowHeader`).
     * Only one row should have this flag enabled.
     */
    isRowHeader?: boolean;
    /**
     * A percentage-width column's configured width is applied via CSS and is part of this type
     * as the numeric size is pass into the column config.
     */
    width?: `${number}%`;
  }
}

/** Floor every leaf column's resize can shrink to, regardless of `enableColumnResizing`. */
export const MIN_COLUMN_SIZE = 40;

function isGroupColumn<T>(column: AdvancedTableColumn<T>): column is AdvancedTableGroupColumn<T> {
  return 'columns' in column && Array.isArray(column.columns);
}

/** Depth-first first leaf column in the tree — the sole host for the expand
 * control + depth indentation (reconciled-spec Enrichments-2: "wrap the first
 * column" rather than a fallback-cell approach). Reserved columns (the
 * selection checkbox) are never part of this tree, so the target always lands
 * on the consumer's actual first column regardless of which reserved leading
 * columns are enabled.
 *
 * Returns the column object itself (not its id/key) so the caller can compare
 * by reference — two columns can legitimately share the same `key` (the same
 * field rendered twice under different titles), and a string-id comparison
 * would wrongly match both. */
// eslint-disable-next-line sonarjs/function-return-type -- both branches are AdvancedTableColumn<T> | undefined (the explicit annotation).
function findFirstLeafColumn<T>(columns: AdvancedTableColumn<T>[]): AdvancedTableColumn<T> | undefined {
  for (const column of columns) {
    if (isGroupColumn(column)) {
      const nested = findFirstLeafColumn(column.columns);
      if (nested !== undefined) return nested;
    } else {
      return column;
    }
  }
  return undefined;
}

/** Options resolving table-level feature flags down onto each generated column. */
type ColumnGeneratorOptions<T> = {
  /** Table-level sorting flag; a column must opt in with its own `enableSorting: true`. */
  enableSorting?: boolean;
  /** Table-level filtering flag; a column must opt in with its own `enableColumnFilter: true`. */
  enableColumnFilter?: boolean;
  /** Table-level pinning flag; a column must opt in with its own `enablePinning: true`. */
  enableColumnPinning?: boolean;
  /** Table-level grouping flag; a column must opt in with its own `enableGrouping: true`. */
  enableGrouping?: boolean;
  /** Table-level resizing flag; a column may opt out with its own `enableResizing: false`. */
  enableColumnResizing?: boolean;
  /** Whether a `renderDetailPanel` is configured — passed through to the expand
   * button's accessible label so it can reference the detail panel it controls. */
  hasDetailPanel?: boolean;
  /** Whether any row in the table can expand at all — gates whether the first
   * leaf column is wrapped in `AdvancedTableExpandCellContent`. */
  hasExpandableRows?: boolean;
  /** Resolved table id; threaded down to the expand button's `aria-controls`
   * so generated element ids stay unique across multiple table instances. */
  tableId?: string;
  /** The column hosting the expand control, resolved once at the top level and
   * threaded through recursive calls by reference — never set by callers. */
  firstLeafColumn?: AdvancedTableColumn<T>;
};

/**
 * Maps the GEL-owned {@link AdvancedTableColumn} shape onto internal TanStack
 * `ColumnDef`s. This is the only place the two representations meet — TanStack
 * types never surface in the public API.
 */
export function columnGenerator<T>(
  columns: AdvancedTableColumn<T>[],
  options: ColumnGeneratorOptions<T> = {},
): ColumnDef<T>[] {
  const firstLeafColumn = options.firstLeafColumn ?? findFirstLeafColumn(columns);

  return columns.map((column): ColumnDef<T> => {
    // If the column is nested, run the column generation on the child columns
    if (isGroupColumn(column)) {
      return {
        id: column.key,
        header: column.title,
        columns: columnGenerator(column.columns, { ...options, firstLeafColumn }),
        enableGrouping: false,
        enablePinning: false,
        enableResizing: false,
      };
    }

    // The leaf column is a distributive union over `keyof T`; widen `render` for the
    // internal call site (the public type still infers the value from `key`).
    const render = column.render as ((value: unknown, row: T) => ReactNode) | undefined;

    // First column has an expand button (if expand is enabled)
    const isExpandColumn = column === firstLeafColumn && Boolean(options.hasExpandableRows);

    return {
      id: String(column.key),
      accessorKey: column.key as string,
      header: column.title,
      meta: {
        align: column.align,
        overflow: column.overflow,
        isRowHeader: Boolean(column.isRowHeader),
        // Widths are applied in TanStack, strings (or %) are applied to the column in styles
        ...(typeof column.width === 'string' ? { width: column.width } : {}),
      },
      // eslint-disable-next-line sonarjs/function-return-type -- both branches are ReactNode (the explicit annotation).
      cell: (info): ReactNode => {
        const value = render ? render(info.getValue(), info.row.original) : (info.getValue() as ReactNode);
        if (!isExpandColumn) return value;

        const { row } = info;
        return (
          <AdvancedTableExpandCellContent
            depth={row.depth}
            // Group rows never reach this cell — they're routed to AdvancedTableGroupRow instead
            showExpandControl={row.getCanExpand()}
            isExpanded={row.getIsExpanded()}
            onToggleExpanded={row.getToggleExpandedHandler()}
            {...getExpandButtonA11yProps(options.tableId ?? '', row, info.getValue(), Boolean(options.hasDetailPanel))}
          >
            {value}
          </AdvancedTableExpandCellContent>
        );
      },
      // Sorting, filtering, pinning and grouping are Table enabled but require column opt-in
      enableSorting: Boolean(options.enableSorting && column.enableSorting),
      enableColumnFilter: Boolean(options.enableColumnFilter && column.enableColumnFilter),
      enablePinning: Boolean(options.enableColumnPinning && column.enablePinning),
      enableGrouping: Boolean(options.enableGrouping && column.enableGrouping),
      // Resizing is enabled only at the table level; a column may opt out with `false`
      enableResizing: options.enableColumnResizing ? (column.enableResizing ?? true) : false,
      minSize: column.minWidth ?? MIN_COLUMN_SIZE,
      ...(typeof column.width === 'number' ? { size: column.width } : {}),
    };
  });
}

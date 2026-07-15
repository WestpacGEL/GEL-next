import { ColumnDef } from '@tanstack/react-table';

import { AdvancedTableRowCheckbox, AdvancedTableSelectAllCheckbox } from '../components/index.js';

/** Stable id for the injected row-selection column. */
export const SELECT_COLUMN_ID = 'select-column';

/** All reserved leading-column ids, in injection order. Ticket 10 appends a pin-column id. */
export const RESERVED_COLUMN_IDS: readonly string[] = [SELECT_COLUMN_ID];

/** Table-level flags that determine which reserved leading columns are built. */
export type ReservedColumnsOptions = {
  /** Renders the checkbox select column when `true`. */
  enableRowSelection?: boolean;
};

/**
 * Builds the reserved leading columns (row selection now; row pinning in a
 * later ticket) to prepend before the consumer's own generated columns.
 * Returns `[]` when no reserved feature is enabled.
 */
export function buildReservedColumns<T>(options: ReservedColumnsOptions): ColumnDef<T>[] {
  const reserved: ColumnDef<T>[] = [];
  if (options.enableRowSelection) reserved.push(selectionColumn<T>());
  return reserved;
}

function selectionColumn<T>(): ColumnDef<T> {
  return {
    id: SELECT_COLUMN_ID,
    header: ({ table }) => <AdvancedTableSelectAllCheckbox table={table} />,
    cell: ({ row, table }) => <AdvancedTableRowCheckbox row={row} table={table} />,
    enableSorting: false,
    enableGrouping: false,
    enableHiding: false,
    enableResizing: false,
    enableColumnFilter: false,
    enableMultiSort: false,
    size: 50,
  };
}

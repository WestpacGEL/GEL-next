import { ColumnDef } from '@tanstack/react-table';

import {
  AdvancedTableRowCheckbox,
  AdvancedTableRowPinToggle,
  AdvancedTableSelectAllCheckbox,
} from '../components/index.js';

// Stable ID for reserved columns
export const PIN_COLUMN_ID = 'pin-column';
export const SELECT_COLUMN_ID = 'select-column';

export const RESERVED_COLUMN_IDS: readonly string[] = [SELECT_COLUMN_ID, PIN_COLUMN_ID];

/** Table-level flags that determine which reserved leading columns are built. */
export type ReservedColumnsOptions = {
  /** Renders the pin-toggle column when `true`. */
  enableRowPinning?: boolean;
  /** Renders the checkbox select column when `true`. */
  enableRowSelection?: boolean;
};

// Builds the reserved leading columns (row selection, row pinning) to prepend before the consumer's own generated columns.
export function buildReservedColumns<T>(options: ReservedColumnsOptions): ColumnDef<T>[] {
  const reserved: ColumnDef<T>[] = [];
  if (options.enableRowSelection) reserved.push(selectionColumn<T>());
  if (options.enableRowPinning) reserved.push(pinColumn<T>());
  return reserved;
}

// The active reserved column ids, in RESERVED_COLUMN_IDS order.
export function getActiveReservedColumnIds(options: ReservedColumnsOptions): string[] {
  return [
    ...(options.enableRowSelection ? [SELECT_COLUMN_ID] : []),
    ...(options.enableRowPinning ? [PIN_COLUMN_ID] : []),
  ];
}

function selectionColumn<T>(): ColumnDef<T> {
  return {
    cell: ({ row, table }) => <AdvancedTableRowCheckbox row={row} table={table} />,
    enableColumnFilter: false,
    enableGrouping: false,
    enableHiding: false,
    enableMultiSort: false,
    enablePinning: false,
    enableResizing: false,
    enableSorting: false,
    header: ({ table }) => <AdvancedTableSelectAllCheckbox table={table} />,
    id: SELECT_COLUMN_ID,
    size: 50,
  };
}

function pinColumn<T>(): ColumnDef<T> {
  return {
    cell: ({ row, table }) => (row.getCanPin() ? <AdvancedTableRowPinToggle row={row} table={table} /> : null),
    enableColumnFilter: false,
    enableGrouping: false,
    enableHiding: false,
    enableMultiSort: false,
    enablePinning: false,
    enableResizing: false,
    enableSorting: false,
    header: '',
    id: PIN_COLUMN_ID,
    size: 50,
  };
}

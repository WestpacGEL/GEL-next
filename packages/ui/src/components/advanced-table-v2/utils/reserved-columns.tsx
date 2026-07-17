import { ColumnDef } from '@tanstack/react-table';

import {
  AdvancedTableRowCheckbox,
  AdvancedTableRowPinToggle,
  AdvancedTableSelectAllCheckbox,
} from '../components/index.js';

/** Stable id for the injected row-selection column. */
export const SELECT_COLUMN_ID = 'select-column';

/** Stable id for the injected row-pinning column. */
export const PIN_COLUMN_ID = 'pin-column';

/** All reserved leading-column ids, in injection (and display) order: selection first, then pin. */
export const RESERVED_COLUMN_IDS: readonly string[] = [SELECT_COLUMN_ID, PIN_COLUMN_ID];

/** Table-level flags that determine which reserved leading columns are built. */
export type ReservedColumnsOptions = {
  /** Renders the checkbox select column when `true`. */
  enableRowSelection?: boolean;
  /** Renders the pin-toggle column when `true`. */
  enableRowPinning?: boolean;
};

/**
 * Builds the reserved leading columns (row selection, row pinning) to prepend
 * before the consumer's own generated columns.
 */
export function buildReservedColumns<T>(options: ReservedColumnsOptions): ColumnDef<T>[] {
  const reserved: ColumnDef<T>[] = [];
  if (options.enableRowSelection) reserved.push(selectionColumn<T>());
  if (options.enableRowPinning) reserved.push(pinColumn<T>());
  return reserved;
}

/** The active reserved column ids, in RESERVED_COLUMN_IDS order. */
export function getActiveReservedColumnIds(options: ReservedColumnsOptions): string[] {
  return [
    ...(options.enableRowSelection ? [SELECT_COLUMN_ID] : []),
    ...(options.enableRowPinning ? [PIN_COLUMN_ID] : []),
  ];
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
    enablePinning: false,
    size: 50,
  };
}

function pinColumn<T>(): ColumnDef<T> {
  return {
    id: PIN_COLUMN_ID,
    header: '',
    // Only top-level rows are pinnable — pinning cascades to sub-rows
    // automatically (see utils/pinned-rows.ts), so a sub-row never needs its
    // own independent toggle.
    cell: ({ row, table }) => (row.depth === 0 ? <AdvancedTableRowPinToggle row={row} table={table} /> : null),
    enableSorting: false,
    enableGrouping: false,
    enableHiding: false,
    enableResizing: false,
    enableColumnFilter: false,
    enableMultiSort: false,
    enablePinning: false,
    size: 50,
  };
}

'use client';

import React, { createContext } from 'react';

import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from './components/index.js';
import { styles as tableStyles } from './table.styles.js';
import { TableContextState, type TableProps } from './table.types.js';

export const TableContext = createContext<TableContextState>({
  bordered: false,
  striped: false,
});

export function Table({ bordered = false, striped = false, children, className, ...props }: TableProps) {
  const styles = tableStyles({});

  return (
    <TableContext.Provider value={{ bordered, striped }}>
      <table className={styles.base({ className })} {...props}>
        {children}
      </table>
    </TableContext.Provider>
  );
}
Table.Body = TableBody;
Table.Caption = TableCaption;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.HeaderRow = TableHeaderRow;
Table.Row = TableRow;

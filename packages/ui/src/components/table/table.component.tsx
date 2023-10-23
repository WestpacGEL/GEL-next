'use client';

import React, { createContext } from 'react';

import { Body, Caption, Cell, Footer, Header, HeaderCell, HeaderRow, Row } from './components/index.js';
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
Table.Body = Body;
Table.Caption = Caption;
Table.Cell = Cell;
Table.Footer = Footer;
Table.Header = Header;
Table.HeaderCell = HeaderCell;
Table.HeaderRow = HeaderRow;
Table.Row = Row;

'use client';

import React, { createContext } from 'react';

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
      <div className={styles.wrapper()}>
        <table className={styles.base({ className })} {...props}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

import { Cell } from '@tanstack/react-table';
import { RefObject } from 'react';

export type AdvancedTableCellProps<T> = {
  cell: Cell<T, unknown>;
  rowRef: RefObject<HTMLTableRowElement>;
};

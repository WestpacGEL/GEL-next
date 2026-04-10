import { CellContext } from '@tanstack/react-table';

export type DefaultCellProps<T> = CellContext<T, unknown> & {
  enableRowSelection?: boolean;
};

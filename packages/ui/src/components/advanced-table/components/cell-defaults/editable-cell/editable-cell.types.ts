import { CellContext } from '@tanstack/react-table';

export type EditableCellProps<T> = CellContext<T, unknown> & {
  enableRowSelection?: boolean;
};

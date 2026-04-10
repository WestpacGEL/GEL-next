import { Header } from '@tanstack/react-table';

export type DefaultHeadCellProps<T> = {
  header: Header<T, unknown>;
  title: string;
};

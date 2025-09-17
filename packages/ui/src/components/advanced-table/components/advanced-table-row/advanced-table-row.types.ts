import { Row } from '@tanstack/react-table';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type AdvancedTableRowProps<T> = {
  rows?: Row<T>[];
  virtualRow?: VirtualItem;
  row?: Row<T>;
  rowVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  scrollableRows?: boolean;
};

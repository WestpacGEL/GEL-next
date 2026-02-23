import { Row } from '@tanstack/react-table';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';

export type AdvancedTableRowProps<T> = {
  tbodyRef?: RefObject<HTMLTableSectionElement>;
  rows?: Row<T>[];
  virtualRow?: VirtualItem;
  row?: Row<T>;
  rowVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  scrollableRows?: boolean;
};

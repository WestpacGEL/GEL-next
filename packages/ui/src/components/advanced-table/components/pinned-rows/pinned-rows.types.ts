import { Row } from '@tanstack/react-table';
import { RefObject } from 'react';

export type PinnedRowsProps<T> = {
  rows: Row<T>[];
  scrollableRows?: boolean;
  theadRef?: RefObject<HTMLTableSectionElement>;
};

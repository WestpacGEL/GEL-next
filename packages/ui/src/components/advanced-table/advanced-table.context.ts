import { Row } from '@tanstack/react-table';
import { createContext, ReactNode, RefObject } from 'react';

export const AdvancedTableContext = createContext<{
  tableRef?: RefObject<HTMLDivElement>;
  enableColumnReordering?: boolean;
  enableRowPinning?: boolean;
  enableRowSelection?: boolean;
  scrollableRows?: boolean;
  scrollableColumns?: boolean;
  columnOrder?: string[];
  extraCellPadding?: boolean;
  bordered?: boolean;
  striped?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderDetailPanel?: (row: Row<any>) => ReactNode;
}>({});

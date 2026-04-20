import { createContext, RefObject } from 'react';

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
}>({});

import { ColumnDef, GroupColumnDef } from '@tanstack/react-table';

export type AdvancedColumnProps<T> = Omit<ColumnDef<T>, 'cell' | 'header' | 'meta' | 'id' | 'footer'> & {
  key: string;
  title: string;
  columns?: AdvancedColumnProps<T>[];
};

export type GroupedColumnProps<T> = Omit<
  GroupColumnDef<T>,
  'columns' | 'accessorFn' | 'cell' | 'header' | 'meta' | 'id' | 'footer'
> & {
  key: string;
  title: string;
};

export type AdvancedTableProps<T> = {
  data: T[];
  columns: AdvancedColumnProps<T>[];
  groupedColumns?: GroupedColumnProps<T>[];
  resizable?: boolean;
  sortable?: boolean;
  subRowKey?: string;
};

import { Row } from '@tanstack/react-table';

export type DetailPanelRowProps<T> = {
  row: Row<T>;
  extraCellPadding?: boolean;
  bordered?: boolean;
};

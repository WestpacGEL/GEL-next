import { Row } from '@tanstack/react-table';

export type DetailPanelRowProps<T> = {
  /** The internal TanStack row this renders a detail panel beneath (supplied
   * by the row it follows). */
  row: Row<T>;
};

import { Header } from '@tanstack/react-table';

/** Props for the per-column resize handle rendered at a header cell's edge. */
export type AdvancedTableResizeHandleProps<T> = {
  /** The internal TanStack header for this column. */
  header: Header<T, unknown>;
};

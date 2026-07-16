import { Row } from '@tanstack/react-table';

export type AdvancedTableRowProps<T> = {
  /** The internal TanStack row to render (supplied by the table body). */
  row: Row<T>;
  /** Renders with the pinned-row lifted-shadow treatment (set by the body when this row is in the pinned section). */
  isPinned?: boolean;
};

import { ReactNode } from 'react';

export type AdvancedTableEmptyStateProps = {
  /** Optional content rendered below the description. */
  children?: ReactNode;
  /** Optional description displayed below the title. */
  description?: string;
  /** Optional icon override. Defaults to a SearchIcon. */
  icon?: ReactNode;
  /** Title displayed in the empty state. */
  title?: string;
};

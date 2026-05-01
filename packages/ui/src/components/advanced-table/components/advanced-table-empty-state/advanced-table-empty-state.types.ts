import { ReactNode } from 'react';

export type AdvancedTableEmptyStateProps = {
  /**
   * Title displayed in the empty state.
   */
  title?: string;
  /**
   * Optional description displayed below the title.
   */
  description?: string;
  /**
   * Optional icon override. Defaults to a SearchIcon.
   */
  icon?: ReactNode;
};

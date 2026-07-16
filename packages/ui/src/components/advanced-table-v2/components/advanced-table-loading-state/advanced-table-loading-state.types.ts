import { ReactNode } from 'react';

export type AdvancedTableLoadingStateProps = {
  /** Title displayed in the loading state. */
  title?: string;
  /** Optional description displayed below the title. */
  description?: string;
  /** Optional icon override. Defaults to a ProgressIndicator. */
  icon?: ReactNode;
};

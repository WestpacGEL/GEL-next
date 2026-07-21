import { SearchIcon } from '../../../icon/index.js';

import { styles as advancedTableEmptyStateStyles } from './advanced-table-empty-state.styles.js';
import { AdvancedTableEmptyStateProps } from './advanced-table-empty-state.types.js';

export function AdvancedTableEmptyState({
  children,
  description,
  icon,
  title = 'No data to display',
}: AdvancedTableEmptyStateProps) {
  const styles = advancedTableEmptyStateStyles();

  return (
    <div className={styles.container()} role="status">
      <div className={styles.icon()}>{icon ?? <SearchIcon aria-hidden size="large" />}</div>
      <p className={styles.title()}>{title}</p>
      {description && <p className={styles.description()}>{description}</p>}
      {children}
    </div>
  );
}

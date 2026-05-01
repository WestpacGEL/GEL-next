import { SearchIcon } from '../../../icon/index.js';

import { styles as advancedTableEmptyStateStyles } from './advanced-table-empty-state.styles.js';
import { AdvancedTableEmptyStateProps } from './advanced-table-empty-state.types.js';

export function AdvancedTableEmptyState({
  title = 'No data to display',
  description,
  icon,
}: AdvancedTableEmptyStateProps) {
  const styles = advancedTableEmptyStateStyles();

  return (
    <div className={styles.container()} role="status">
      <div className={styles.icon()}>{icon ?? <SearchIcon size="large" aria-label="No data" />}</div>
      <p className={styles.title()}>{title}</p>
      {description && <p className={styles.description()}>{description}</p>}
    </div>
  );
}

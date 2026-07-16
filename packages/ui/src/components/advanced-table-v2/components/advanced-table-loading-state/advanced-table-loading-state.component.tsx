import { ProgressIndicator } from '../../../progress-indicator/index.js';

import { styles as advancedTableLoadingStateStyles } from './advanced-table-loading-state.styles.js';
import { AdvancedTableLoadingStateProps } from './advanced-table-loading-state.types.js';

export function AdvancedTableLoadingState({
  title = 'Loading data…',
  description,
  icon,
}: AdvancedTableLoadingStateProps) {
  const styles = advancedTableLoadingStateStyles();

  return (
    <div className={styles.container()} role="status">
      <div className={styles.icon()}>{icon ?? <ProgressIndicator size="large" />}</div>
      <p className={styles.title()}>{title}</p>
      {description && <p className={styles.description()}>{description}</p>}
    </div>
  );
}

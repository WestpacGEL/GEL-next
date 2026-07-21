import { ProgressIndicator } from '../../../progress-indicator/index.js';

import { styles as advancedTableLoadingStateStyles } from './advanced-table-loading-state.styles.js';
import { AdvancedTableLoadingStateProps } from './advanced-table-loading-state.types.js';

export function AdvancedTableLoadingState({
  label = 'Loading data…',
  size = 'large',
  ...props
}: AdvancedTableLoadingStateProps) {
  const styles = advancedTableLoadingStateStyles();

  return (
    <div className={styles.container()} role="status">
      <ProgressIndicator size={size} label={label} {...props} />
    </div>
  );
}

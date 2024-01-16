import React from 'react';

import { styles } from './progress-indicator.styles.js';
import { type ProgressIndicatorProps } from './progress-indicator.types.js';

export function ProgressIndicator({
  className,
  children,
  inverted = false,
  size = 'medium',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: ProgressIndicatorProps) {
  return (
    <div className={styles({ className, size, inverted })} aria-label={ariaLabel} {...props}>
      {children}
    </div>
  );
}

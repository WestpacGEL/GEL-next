import React from 'react';

import { Icon } from '../icon/icon.component.js';

import { styles } from './progress-indicator.styles.js';
import { ProgressIndicatorProps } from './progress-indicator.types.js';

export function ProgressIndicator({
  className,
  children,
  color = 'hero',
  size = 'medium',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: ProgressIndicatorProps) {
  return (
    <Icon className={styles({ className })} size={size} color={color} aria-label={ariaLabel} {...props}>
      {children}
    </Icon>
  );
}

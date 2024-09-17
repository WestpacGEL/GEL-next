import React from 'react';

import { Icon } from '../icon/icon.component.js';
import { IconProps } from '../icon/icon.types.js';

import { styles } from './progress-indicator.styles.js';
import { type ProgressIndicatorProps } from './progress-indicator.types.js';

export function ProgressIndicator({
  className,
  children,
  color = 'hero',
  size = 'medium',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: IconProps) {
  return (
    <Icon className={styles({ className, size })} color={color} aria-label={ariaLabel} {...props}>
      {children}
    </Icon>
  );
}

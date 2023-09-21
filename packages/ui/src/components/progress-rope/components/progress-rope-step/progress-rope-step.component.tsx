import React from 'react';

import { Circle } from '../../../index.js';

import { styles as progressRopeStyles } from './progress-rope-step.styles.js';
import { type ProgressRopeStepProps } from './progress-rope-step.types.js';

export function ProgressRopeStep({
  className,
  current,
  visited,
  tag: Tag = 'button',
  type,
  size = 'medium',
  children,
  firstItem,
  ...props
}: ProgressRopeStepProps) {
  const styles = progressRopeStyles({ className, current, visited, size, firstItem });

  return (
    <Tag className={styles.base({})} aria-current={current} {...props}>
      <Circle className={styles.circle()} aria-hidden="true" />
      {children}
    </Tag>
  );
}

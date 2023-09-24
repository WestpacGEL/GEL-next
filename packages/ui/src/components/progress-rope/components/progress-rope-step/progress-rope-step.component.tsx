import React, { useMemo } from 'react';

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
  const state = useMemo(() => {
    if (current) {
      return 'current';
    }
    if (visited) {
      return 'visited';
    }
    return 'non-visited';
  }, [current, visited]);

  const styles = progressRopeStyles({ className, state, size, firstItem });

  return (
    <Tag className={styles.base({})} aria-current={current} disabled={state === 'non-visited'} {...props}>
      <Circle className={styles.circle()} aria-hidden="true" />
      {children}
    </Tag>
  );
}

import React from 'react';
import { mergeProps } from 'react-aria';

import { BaseRopeStep } from '../base-rope-step/base-rope-step.component.js';
import { useRopeStep } from '../base-rope-step/use-rope-step.hook.js';

import { type ProgressRopeStepProps } from './progress-rope-step.types.js';

/**
 * @private
 */
export function ProgressRopeStep({
  className,
  current,
  visited,
  size = 'medium',
  firstItem,
  lastItemInGroup,
  lastItemInRope,
  furthest,
  previousStepGroup,
  text,
  ...props
}: ProgressRopeStepProps) {
  const { focusProps, state, styles } = useRopeStep({
    className,
    current,
    firstItem,
    furthest,
    lastItemInGroup,
    lastItemInRope,
    previousStepGroup,
    size,
    variant: 'progress',
    visited,
  });

  return (
    <button
      type="button"
      className={styles.base({})}
      aria-current={current ? 'step' : false}
      disabled={state === 'non-visited' && !furthest}
      {...mergeProps(props, focusProps)}
    >
      <BaseRopeStep
        current={current}
        visited={visited}
        furthest={furthest}
        styles={styles}
        text={text}
        variant="progress"
      />
    </button>
  );
}

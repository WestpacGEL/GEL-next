import React from 'react';
import { mergeProps } from 'react-aria';

import { BaseRopeStep } from '../base-rope-step/base-rope-step.component.js';
import { useRopeStep } from '../base-rope-step/use-rope-step.hook.js';
import { type StatusRopeStepProps } from '../progress-rope-step/progress-rope-step.types.js';

/**
 * @private
 */
export function StatusRopeStep({
  className,
  current,
  visited,
  size = 'medium',
  firstItem,
  lastItemInGroup,
  lastItemInRope,
  furthest,
  previousStepGroup,
  subText,
  text,
  ...props
}: StatusRopeStepProps) {
  const { focusProps, styles } = useRopeStep({
    className,
    current,
    firstItem,
    furthest,
    lastItemInGroup,
    lastItemInRope,
    previousStepGroup,
    size,
    variant: 'status',
    visited,
  });

  return (
    <div className={styles.base()} aria-current={current ? 'step' : false} {...mergeProps(props, focusProps)}>
      <BaseRopeStep
        current={current}
        visited={visited}
        furthest={furthest}
        styles={styles}
        subText={subText}
        text={text}
        variant="status"
      />
    </div>
  );
}

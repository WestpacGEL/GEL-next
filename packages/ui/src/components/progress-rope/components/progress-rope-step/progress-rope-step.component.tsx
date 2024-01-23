import React, { useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { Circle } from '../../../index.js';

import { styles as progressRopeStyles } from './progress-rope-step.styles.js';
import { type ProgressRopeStepProps } from './progress-rope-step.types.js';

/**
 * @private
 */
export function ProgressRopeStep({
  className,
  current,
  visited,
  tag: Tag = 'button',
  type,
  size = 'medium',
  children,
  firstItem,
  lastItemInGroup,
  lastItemInRope,
  furthest,
  previousStepGroup,
  ...props
}: ProgressRopeStepProps) {
  const state = useMemo(() => {
    if (lastItemInRope && visited && current) {
      return 'last-current';
    }
    if (lastItemInRope && visited) {
      return 'last-visited';
    }
    if (current && visited) {
      return 'current-visited';
    }
    if (current) {
      return 'current';
    }
    if (visited) {
      return 'visited';
    }
    return 'non-visited';
  }, [current, visited]);
  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = progressRopeStyles({
    className,
    state,
    size,
    firstItem,
    lastItemInGroup,
    lastItemInRope: lastItemInRope && !previousStepGroup,
    lastItemInRopeGrouped: lastItemInRope && previousStepGroup,
    furthestVisited: !current && furthest,
    previousStepGroup: furthest && previousStepGroup,
    isFocusVisible,
  });

  return (
    <Tag
      className={styles.base({})}
      aria-current={current}
      disabled={state === 'non-visited'}
      {...mergeProps(props, focusProps)}
    >
      <Circle className={styles.circle()} aria-hidden="true" />
      {children}
    </Tag>
  );
}

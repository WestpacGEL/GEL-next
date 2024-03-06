import React, { useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { Circle, VisuallyHidden } from '../../../index.js';

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
  }, [current, lastItemInRope, visited]);
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

  const stateText = useMemo(() => {
    if (current) {
      return ', in progress';
    }
    if (visited || (!current && furthest)) {
      return ', complete';
    }
    return ', not started';
  }, [current, furthest, visited]);

  return (
    <Tag
      className={styles.base({})}
      aria-current={current ? 'step' : false}
      disabled={state === 'non-visited'}
      {...mergeProps(props, focusProps)}
    >
      <Circle className={styles.circle()} aria-hidden="true" />
      {children}
      <VisuallyHidden>{stateText}</VisuallyHidden>
    </Tag>
  );
}

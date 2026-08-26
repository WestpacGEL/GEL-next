import React, { useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { Circle, VisuallyHidden } from '../../../index.js';

import { styles as progressRopeStyles } from './progress-rope-step.styles.js';
import {
  type BaseRopeStepProps,
  type ProgressRopeStepProps,
  RopeStepProps,
  type StatusRopeStepProps,
  type UseRopeStepProps,
} from './progress-rope-step.types.js';

function getRopeStepState({
  current,
  lastItemInRope,
  visited,
}: Pick<RopeStepProps, 'current' | 'lastItemInRope' | 'visited'>) {
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
}

function useRopeStep({
  className,
  current,
  firstItem,
  furthest,
  lastItemInGroup,
  lastItemInRope,
  previousStepGroup,
  size = 'medium',
  variant,
  visited,
}: UseRopeStepProps) {
  const state = useMemo(
    () => getRopeStepState({ current, lastItemInRope, visited }),
    [current, lastItemInRope, visited],
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const breakpoint = useBreakpoint();

  const styles = progressRopeStyles({
    className,
    state,
    size: resolveResponsiveVariant(size, breakpoint),
    firstItem,
    lastItemInGroup,
    lastItemInRope: lastItemInRope && !previousStepGroup,
    lastItemInRopeGrouped: lastItemInRope && previousStepGroup,
    furthestVisited: !current && furthest,
    previousStepGroup: furthest && previousStepGroup,
    isFocusVisible,
    variant,
  });

  return { focusProps, state, styles };
}

export function BaseRopeStep({ current, visited, furthest, styles, text, subText }: BaseRopeStepProps) {
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
    <>
      {subText === undefined ? (
        <>
          <Circle className={styles.circle()} aria-hidden="true" />
          {text}
        </>
      ) : (
        <div className={styles.label()}>
          <Circle className={styles.circle()} aria-hidden="true" />
          <div>{text}</div>
          <div className={styles.subText()}>{subText}</div>
        </div>
      )}
      <VisuallyHidden>{stateText}</VisuallyHidden>
    </>
  );
}

/**
 * @private
 */
export function ProgressRopeStep({
  className,
  current,
  visited,
  tag: Tag = 'button',
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
    <Tag
      className={styles.base({})}
      aria-current={current ? 'step' : false}
      disabled={state === 'non-visited'}
      {...mergeProps(props, focusProps)}
    >
      <BaseRopeStep current={current} visited={visited} furthest={furthest} styles={styles} text={text} />
    </Tag>
  );
}

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
      />
    </div>
  );
}

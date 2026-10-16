import { LazyMotion, m, useAnimate } from 'motion/react';
import React, { useEffect, useId, useMemo, useState } from 'react';
import { useFocusRing } from 'react-aria';

import { ExpandLessIcon, ExpandMoreIcon } from '../../../icon/index.js';
import { Circle, VisuallyHidden } from '../../../index.js';
import { RopeStepItem } from '../base-rope/base-rope.types.js';

import { baseRopeGroupStepStyles } from './base-rope-group-step.styles.js';
import { type BaseRopeGroupStepProps } from './base-rope-group-step.types.js';

const loadAnimations = () => import('./base-rope-group-step.utils.js').then(res => res.default);

/**
 * @private
 */
export function BaseRopeGroupStep<TStepItem extends RopeStepItem>({
  steps,
  currentKey,
  furthestVisitedStep,
  children,
  firstItem,
  lastItem,
  opened,
  onToggle,
  tag: Tag,
  renderStep,
  variant,
}: BaseRopeGroupStepProps<TStepItem>) {
  // Handling expanding animation this way for focus ring on steps
  const [scope, animate] = useAnimate();
  const id = useId();
  const stepsContainerID = `base-rope-group-steps-container-${id}`;

  const current = useMemo(() => {
    return !!steps.find(step => step.index === currentKey);
  }, [steps, currentKey]);

  const visited = useMemo(() => {
    return !!steps.find(step => (furthestVisitedStep || 0) >= step.index);
  }, [steps, furthestVisitedStep]);

  const visuallyHiddenMessage = useMemo(() => {
    if (steps.slice(-1)[0].index < (furthestVisitedStep || 0)) {
      return ', completed';
    }
    if (current || visited) {
      return ', in progress';
    }
    return ', not started';
  }, [steps, furthestVisitedStep, current, visited]);

  const { isFocusVisible, focusProps } = useFocusRing();

  const state = useMemo(() => {
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

  const styles = baseRopeGroupStepStyles({ firstItem, state, isFocusVisible, variant });
  const [overflowVisible, setOverflowVisible] = useState(false);

  useEffect(() => {
    // Animates expanding/collapsing steps
    if (opened) {
      animate(
        scope.current,
        { height: 'auto' },
        {
          duration: 0.2,
          ease: 'easeInOut',
          onComplete: () => {
            setOverflowVisible(true);
          },
        },
      );
    } else {
      animate(
        scope.current,
        { height: 0 },
        {
          duration: 0.2,
          ease: 'easeInOut',
          onPlay: () => {
            setOverflowVisible(false);
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Tag>
      <button
        type="button"
        aria-expanded={opened}
        className={styles.circleWrapper({})}
        onClick={onToggle}
        aria-controls={stepsContainerID}
        disabled={variant === 'progress' && !current && !visited}
        {...focusProps}
      >
        <Circle className={styles.circle()} aria-hidden="true" />
        {variant === 'status' ? (
          <span className={styles.label()}>
            {children}
            {opened ? (
              <ExpandLessIcon aria-hidden="true" className={styles.icon()} size="small" />
            ) : (
              <ExpandMoreIcon aria-hidden="true" className={styles.icon()} size="small" />
            )}
          </span>
        ) : (
          children
        )}
        <VisuallyHidden>{visuallyHiddenMessage}</VisuallyHidden>
      </button>
      <LazyMotion features={loadAnimations}>
        <m.div
          ref={scope}
          initial={{ height: opened ? 'auto' : 0 }}
          style={{
            overflow: overflowVisible ? 'visible' : 'hidden', // to show focus ring correctly when expanded
          }}
        >
          <ol className={styles.stepsWrapper({})} id={stepsContainerID} aria-hidden={!opened}>
            {steps.map((step, index) => (
              <li key={step.index}>
                {renderStep(step, {
                  current: step.index === currentKey,
                  firstItem: index === 0,
                  furthest: furthestVisitedStep === step.index,
                  furthestVisitedStep: furthestVisitedStep || 0,
                  lastItem: index === steps.length - 1,
                  lastItemInRope: !!lastItem && index === steps.length - 1,
                  tabIndex: opened ? 0 : -1,
                  visited: (furthestVisitedStep || 0) > step.index,
                })}
              </li>
            ))}
          </ol>
        </m.div>
      </LazyMotion>
    </Tag>
  );
}

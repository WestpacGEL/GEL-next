import { LazyMotion, m, useAnimate } from 'motion/react';
import React, { useEffect, useId, useMemo, useState } from 'react';
import { useFocusRing } from 'react-aria';

import { Circle, VisuallyHidden } from '../../../index.js';
import { ProgressRopeStep } from '../index.js';

import { styles as progressRopeGroupStyles } from './progress-rope-group-step.styles.js';
import { type ProgressRopeGroupStepProps } from './progress-rope-group-step.types.js';

const loadAnimations = () => import('./progress-rope-group-step.utils.js').then(res => res.default);

/**
 * @private
 */
export function ProgressRopeGroupStep({
  steps,
  currentKey,
  furthestVisitedStep,
  children,
  firstItem,
  opened,
  onToggle,
  tag: Tag,
}: ProgressRopeGroupStepProps) {
  // Handling expanding animation this way for focus ring on steps
  const [scope, animate] = useAnimate();
  const id = useId();
  const stepsContainerID = `progress-rope-group-steps-container-${id}`;

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

  const styles = progressRopeGroupStyles({ firstItem, state, isFocusVisible });
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
        aria-expanded={opened}
        className={styles.circleWrapper({})}
        onClick={onToggle}
        aria-controls={stepsContainerID}
        {...focusProps}
      >
        <Circle className={styles.circle()} aria-hidden="true" />
        {children}
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
                <ProgressRopeStep
                  firstItem={index === 0}
                  lastItemInGroup={index === steps.length - 1}
                  size="small"
                  onClick={(furthestVisitedStep || 0) >= step.index ? step.onClick : undefined}
                  current={step.index === currentKey}
                  visited={(furthestVisitedStep || 0) > step.index}
                  furthest={furthestVisitedStep === step.index}
                  tabIndex={opened ? 0 : -1} // Using hidden/visibility breaks styles
                >
                  {step.text}
                </ProgressRopeStep>
              </li>
            ))}
          </ol>
        </m.div>
      </LazyMotion>
    </Tag>
  );
}

import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import React, { useId, useMemo } from 'react';
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
        <AnimatePresence initial={false}>
          {opened && (
            <m.div
              initial={{
                height: 0,
                overflow: 'hidden',
              }}
              animate={{
                height: 'auto',
              }}
              exit={{
                height: 0,
                overflow: 'hidden',
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
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
                    >
                      {step.text}
                    </ProgressRopeStep>
                  </li>
                ))}
              </ol>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </Tag>
  );
}

import React, { useMemo } from 'react';

import { Circle, VisuallyHidden } from '../../../index.js';
import { type BaseRopeStepProps } from '../progress-rope-step/progress-rope-step.types.js';

/**
 * @private
 */
export function BaseRopeStep({ current, visited, furthest, styles, text, subText, variant }: BaseRopeStepProps) {
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
      {variant === 'progress' ? (
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

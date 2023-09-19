import React from 'react';
import { useProgressBar } from 'react-aria';

import { styles as progressBarStyles } from './progress-bar.styles.js';
import { type ProgressBarProps } from './progress-bar.types.js';

export function ProgressBar({ className, look = 'default', value = 0, noLabel = false, ...props }: ProgressBarProps) {
  const roundedValue = Math.round(value);
  const barValue = `${roundedValue}%`;

  const { progressBarProps, labelProps } = useProgressBar({
    value: roundedValue,
    label: barValue,
    ...props,
  });

  const styles = progressBarStyles({ look });

  return (
    <div {...progressBarProps} className={styles.base({ className })}>
      <div style={{ width: barValue }} className={styles.innerBar()}>
        <span className={styles.label({ class: `${noLabel || look === 'skinny' ? 'hidden' : ''}` })} {...labelProps}>
          {barValue}
        </span>
      </div>
    </div>
  );
}

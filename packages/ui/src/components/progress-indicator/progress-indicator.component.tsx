import React, { useId } from 'react';

import { Icon } from '../icon/icon.component.js';
import { Label } from '../label/label.component.js';

import { styles as ProgressIndicatorStyles } from './progress-indicator.styles.js';
import { ProgressIndicatorProps } from './progress-indicator.types.js';

export function ProgressIndicator({
  color = 'hero',
  inverted = false,
  label,
  size = 'medium',
  icon: EmbedIcon,
  className,
  'aria-label': ariaLabel = 'Loading',
  ...props
}: ProgressIndicatorProps) {
  const styles = ProgressIndicatorStyles({
    size,
    inverted,
  });

  const id = useId();

  const sizeMap: Record<string, { strokeWidth: number }> = {
    xlarge: { strokeWidth: 4 },
    large: { strokeWidth: 4 },
    medium: { strokeWidth: 15 },
    small: { strokeWidth: 20 },
    xsmall: { strokeWidth: 30 },
  };

  const strokeHalfWidth = sizeMap[size.toString()].strokeWidth / 2;

  return (
    <div aria-label={ariaLabel} className={styles.container()}>
      <div className="relative">
        <Icon
          viewBox="0 0 180 180"
          fill="none"
          color={inverted ? 'white' : 'hero'}
          className={styles.base({ className })}
          {...props}
        >
          <defs>
            <linearGradient id={`${id}-1`}>
              <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
            <linearGradient id={`${id}-2`}>
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="50%" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <g strokeWidth={strokeHalfWidth * 2}>
            <>
              <path
                stroke={`url(#${id}-1)`}
                d={`M ${strokeHalfWidth} 90 A ${90 - strokeHalfWidth} ${90 - strokeHalfWidth} 0 0 1 ${180 - strokeHalfWidth} 90`}
              ></path>
              <path
                stroke={`url(#${id}-2)`}
                d={`M ${180 - strokeHalfWidth} 90 A ${90 - strokeHalfWidth} ${90 - strokeHalfWidth} 0 0 1 ${strokeHalfWidth} 90`}
              ></path>
            </>
          </g>
        </Icon>
        {EmbedIcon && size === 'large' && <EmbedIcon size="large" className={styles.icon()} />}
      </div>
      {label && size === 'large' && <Label className={styles.label()}>{label}</Label>}
    </div>
  );
}

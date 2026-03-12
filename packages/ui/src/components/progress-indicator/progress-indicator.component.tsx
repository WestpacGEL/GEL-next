'use client';

import React, { useId } from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Icon } from '../icon/icon.component.js';
import { Label } from '../label/label.component.js';

import { styles as ProgressIndicatorStyles } from './progress-indicator.styles.js';
import { ProgressIndicatorProps } from './progress-indicator.types.js';

export function ProgressIndicator({
  color = 'hero',
  label,
  size = 'medium',
  icon: EmbedIcon,
  className,
  'aria-label': ariaLabel = 'Loading',
  ...props
}: ProgressIndicatorProps) {
  const breakpoint = useBreakpoint();
  const resolvedSize = resolveResponsiveVariant(size, breakpoint) || 'medium';
  const styles = ProgressIndicatorStyles({
    size: resolveResponsiveVariant(resolvedSize, breakpoint),
    color: resolveResponsiveVariant(color, breakpoint),
  });

  const id = useId();

  const sizeMap: Record<string, { strokeWidth: number }> = {
    xlarge: { strokeWidth: 4 },
    large: { strokeWidth: 4 },
    medium: { strokeWidth: 15 },
    small: { strokeWidth: 20 },
    xsmall: { strokeWidth: 30 },
  };

  // TODO: fix this properly

  const strokeHalfWidth = sizeMap[resolvedSize.toString()].strokeWidth / 2;

  return (
    <div aria-label={ariaLabel} className={styles.container()}>
      <div className="relative flex items-center justify-center">
        <Icon viewBox="0 0 180 180" fill="none" color={color} className={styles.base({ className })} {...props}>
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
        {EmbedIcon && resolvedSize === 'large' && <EmbedIcon size="large" color={color} className={styles.icon()} />}
      </div>
      {label && resolvedSize === 'large' && <Label className={styles.label()}>{label}</Label>}
    </div>
  );
}

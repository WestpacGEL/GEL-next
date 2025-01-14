'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function AccountsPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Accounts',
  copyrightYear = '2024',
  className,
  ...props
}: PictogramProps) {
  return (
    <Pictogram
      className={clsx('size-13', className)}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path
          className={fill({ mode, highlight: true })}
          d="M24.482 43.035c-.39.46-.876.777-1.452.964v-5.816c.699.258 1.229.59 1.569 1.008.412.505.617 1.107.617 1.804 0 .782-.245 1.46-.734 2.04m-5.688-11.283a2.627 2.627 0 0 1-.5-1.54c0-.604.182-1.156.546-1.656a2.906 2.906 0 0 1 1.279-.983v5.234c-.578-.28-1.025-.628-1.325-1.055m8.892 4.533c-.85-1.011-2.407-1.842-4.656-2.501v-5.976c.737.475 1.22 1.208 1.42 2.233l3.954-.516c-.271-1.562-.895-2.81-1.875-3.742-.885-.843-2.061-1.37-3.5-1.612V22.54h-2.91v1.58c-1.7.207-3.077.857-4.115 1.976-1.08 1.16-1.617 2.596-1.617 4.304 0 1.688.476 3.124 1.429 4.305.923 1.146 2.36 2.006 4.303 2.589v6.5c-.487-.274-.935-.67-1.341-1.204-.458-.605-.771-1.324-.938-2.157l-4.08.437c.314 2.053 1.033 3.643 2.158 4.768 1.084 1.083 2.489 1.735 4.2 1.978v2.88h2.912v-3.003c1.813-.34 3.25-1.101 4.304-2.293 1.14-1.293 1.71-2.881 1.71-4.767 0-1.688-.453-3.071-1.358-4.148"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="36.545 29.543 62.498 29.543 62.498 26.543 36.545 26.543"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="36.545 38.61 62.498 38.61 62.498 35.61 36.545 35.61"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="36.545 47.678 62.498 47.678 62.498 44.678 36.545 44.678"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M68.93 55.333a2.338 2.338 0 0 1-2.335 2.335H8.835A2.338 2.338 0 0 1 6.5 55.333V18.782a2.338 2.338 0 0 1 2.335-2.335h57.76a2.338 2.338 0 0 1 2.335 2.335v36.551zm4.365-36.738c-.77-.984-3.865-3.718-4.522-4.053A4.776 4.776 0 0 0 66.595 14H8.835A4.84 4.84 0 0 0 4 18.835v36.551c0 .743.139 1.311.388 1.893 1.172 2.649 4.39 4.642 5.078 5.02.69.38 1.318.503 2.159.503h57.76a4.84 4.84 0 0 0 4.836-4.835V21.416c0-1.055-.157-1.837-.926-2.821z"
        />
      </g>
    </Pictogram>
  );
}

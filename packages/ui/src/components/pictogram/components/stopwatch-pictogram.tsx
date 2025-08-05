'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function StopwatchPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Stopwatch',
  copyrightYear = '2025',
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
        <polygon
          className={fill({ mode, outline: true })}
          points="30.423 24.352 27.704 25.62 37.002 45.558 38.295 44.955 54.213 44.955 54.213 41.955 38.631 41.955"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.8218,68.6453 C24.3338,68.6453 12.5468,56.8583 12.5468,42.3703 C12.5468,27.8813 24.3338,16.0943 38.8218,16.0943 C53.3098,16.0943 65.0968,27.8813 65.0968,42.3703 C65.0968,56.8583 53.3098,68.6453 38.8218,68.6453 M63.0038,26.8753 C61.2048,24.0723 58.9258,21.6103 56.2968,19.5823 L57.8908,16.7053 L60.9528,18.4023 L63.3768,14.0293 L52.8818,8.2113 L50.4568,12.5843 L53.5178,14.2813 L52.0788,16.8783 C48.0968,14.7893 43.5758,13.5943 38.7758,13.5943 C22.9088,13.5943 9.9998,26.5033 9.9998,42.3703 C9.9998,48.7323 12.0798,54.6163 15.5898,59.3863 C20.7098,67.3643 29.6538,72.6663 39.8178,72.6663 C55.6838,72.6663 68.5928,59.7583 68.5928,43.8913 C68.5928,37.5293 66.5128,31.6453 63.0038,26.8753"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M32.7046 3.9998L32.7046 8.9998 36.2046 8.9998 36.2046 13.7128C37.8716 13.5658 39.5436 13.5538 41.2046 13.6848L41.2046 8.9998 44.7046 8.9998 44.7046 3.9998 32.7046 3.9998zM38.7124 37.9549C35.9504 37.9549 33.7124 40.1939 33.7124 42.9549 33.7124 45.7159 35.9504 47.9549 38.7124 47.9549 41.4734 47.9549 43.7124 45.7159 43.7124 42.9549 43.7124 40.1939 41.4734 37.9549 38.7124 37.9549"
        />
      </g>
    </Pictogram>
  );
}

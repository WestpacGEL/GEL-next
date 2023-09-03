import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function ClockPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Clock',
  copyrightYear = '2023',
  className,
  ...props
}: PictogramProps) {
  return (
    <Pictogram
      className={clsx('h-13 w-13', className)}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path
          className={fill({ mode, outline: true })}
          d="M38.268,68.0371 C21.854,68.0371 8.5,54.6831 8.5,38.2681 C8.5,21.8551 21.854,8.5021 38.268,8.5021 C54.681,8.5021 68.035,21.8551 68.035,38.2681 C68.035,54.6831 54.681,68.0371 38.268,68.0371 M65.437,20.8941 C59.696,11.9471 49.666,6.0001 38.268,6.0001 C20.476,6.0001 6,20.4741 6,38.2671 C6,45.4011 8.331,51.9981 12.266,57.3461 C18.006,66.3001 28.039,72.2501 39.442,72.2501 C57.234,72.2501 71.709,57.7751 71.709,39.9831 C71.709,32.8451 69.375,26.2451 65.437,20.8941"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="39.857 18.905 36.857 18.905 36.857 38.847 38.357 38.847 37.272 39.884 53.44 56.814 55.61 54.742 39.857 38.246"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M38.3569,34.3574 C35.8769,34.3574 33.8659,36.3674 33.8659,38.8474 C33.8659,41.3284 35.8769,43.3374 38.3569,43.3374 C40.8369,43.3374 42.8479,41.3284 42.8479,38.8474 C42.8479,36.3674 40.8369,34.3574 38.3569,34.3574"
        />
      </g>
    </Pictogram>
  );
}

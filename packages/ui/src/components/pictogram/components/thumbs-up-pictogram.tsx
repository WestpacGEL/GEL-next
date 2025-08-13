'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function ThumbsUpPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Thumbs up',
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
        <path
          className={fill({ mode, highlight: true })}
          d="M9.1676,62.0618 C9.1676,60.0678 10.7956,58.4518 12.8036,58.4518 C14.8116,58.4518 16.4396,60.0678 16.4396,62.0618 C16.4396,64.0558 14.8116,65.6718 12.8036,65.6718 C10.7956,65.6718 9.1676,64.0558 9.1676,62.0618 L9.1676,62.0618 Z M6.0006,69.1518 L19.5056,69.1518 L19.5056,32.5468 L6.0006,32.5468 L6.0006,69.1518 Z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M65.5963,43.4245 L56.8313,63.8855 C56.1313,65.5655 54.4903,66.6515 52.6503,66.6515 L23.2633,66.6515 L22.0053,66.6515 L22.0053,33.0985 C22.0053,31.8785 22.4713,30.7405 23.3203,29.8945 L41.5493,11.6605 L41.6613,11.7715 L43.7353,13.8265 C44.2993,14.3905 44.6273,15.1685 44.6403,15.9675 L42.5503,34.3485 L61.3483,34.3485 C65.0053,34.3485 65.8983,35.2415 65.8983,38.8995 C65.8983,40.6175 65.7303,43.0105 65.5963,43.4245 M65.1063,31.8485 L61.3483,31.8485 L49.1113,31.8485 L50.8093,17.0555 L50.8933,16.1325 L50.8993,16.0195 C50.8993,14.5435 50.3013,13.0995 49.2563,12.0545 L46.7853,9.6075 C46.3963,9.2215 45.8923,9.0265 45.3823,9.0075 L45.3823,8.9995 L41.5923,8.9995 L41.5923,9.0055 C41.0373,8.9945 40.4803,9.1945 40.0603,9.6135 L21.5533,28.1245 C20.2323,29.4435 19.5053,31.2105 19.5053,33.0985 L19.5053,69.1515 L24.5873,69.1515 L52.6503,69.1515 L56.4083,69.1515 C59.2593,69.1515 61.8053,67.4625 62.8923,64.8585 L71.6663,44.3725 C72.1273,43.1965 72.1563,38.9415 72.1563,38.8995 C72.1563,33.8915 70.1133,31.8485 65.1063,31.8485"
        />
      </g>
    </Pictogram>
  );
}

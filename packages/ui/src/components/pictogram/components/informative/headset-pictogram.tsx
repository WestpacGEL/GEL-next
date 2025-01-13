'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function HeadsetPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Headset',
  copyrightYear = '2021',
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
          className={fill({ mode, outline: true })}
          d="M63.779 53.145c0 3.82-3.16 6.932-7.05 6.946a4.035 4.035 0 0 1-4.004-4.034V44.743c0-2.227 1.805-4.038 4.024-4.038h4.033v-6.786c0-12.833-10.588-23.272-23.602-23.272-13.014 0-23.603 10.44-23.603 23.272v6.786h5.066a4.035 4.035 0 0 1 4.024 4.038v11.314a4.034 4.034 0 0 1-4.024 4.034h-.986c-3.901 0-7.075-3.116-7.075-6.946V33.919c0-14.434 11.932-26.176 26.598-26.176 14.667 0 26.599 11.742 26.599 26.176v19.226zM36.673 5.166C20.817 5.436 8 18.226 8 33.92v19.226c0 4.982 3.891 9.078 8.83 9.494 1.729.132 4.203.344 6.534-.058a6.622 6.622 0 0 0 5.51-6.524V44.743c0-3.655-2.965-6.628-6.607-6.628h-2.484V33.92c0-10.803 8.466-19.683 19.209-20.592 10.744.909 19.208 9.79 19.208 20.592v4.196h-1.45c-3.643 0-6.607 2.973-6.607 6.628v11.314a6.624 6.624 0 0 0 5.525 6.526c2.138.327 3.74.279 5.533.053l.006-.001c4.914-.441 8.778-4.526 8.778-9.49V33.919c0-15.816-13.016-28.688-29.042-28.762l-4.27.01z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M55.668 62.58a19.69 19.69 0 0 0 2.272.222c-.621 4.466-4.289 7.933-8.758 8.067l-.27.004h-4.284c-.477 1.186-1.579 2.04-2.88 2.118l-.197.006h-6.217c-1.838 0-3.334-1.542-3.334-3.435 0-1.834 1.398-3.337 3.152-3.435l.182-.005h6.217c1.32 0 2.462.797 3.001 1.95l.076.176h4.285c3.275 0 5.994-2.482 6.492-5.719.087.02.175.036.263.05z"
        />
      </g>
    </Pictogram>
  );
}

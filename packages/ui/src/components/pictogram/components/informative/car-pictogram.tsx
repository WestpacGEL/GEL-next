'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function CarPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Car',
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
          d="M70.639 48.49h-5.184c0-.027.004-.053.004-.08a7.218 7.218 0 0 0-7.21-7.21c-3.975 0-7.21 3.234-7.21 7.21 0 .027.004.053.004.08H23.462c0-.027.004-.053.004-.08a7.218 7.218 0 0 0-7.21-7.21 7.218 7.218 0 0 0-7.21 7.21c0 .027.004.053.004.08H5.573v-5.832a7.735 7.735 0 0 1 4.954-7.215c.79-.304 2.843-.723 6.16-1.258a10.948 10.948 0 0 0 4.512-2.07c1.51-1.177 3.89-2.905 6.639-4.45 6.47-3.632 11.036-5.317 18.128-5.15.055 0 5.548-.095 8.585.203 8.748.859 14.913 5.643 16.913 13.122.915 3.42.586 9.09-.72 12.383l-.105.267zm-17.1-.08a4.715 4.715 0 0 1 4.71-4.71 4.715 4.715 0 0 1 4.71 4.71 4.715 4.715 0 0 1-4.71 4.709 4.715 4.715 0 0 1-4.71-4.71zm-41.993 0a4.715 4.715 0 0 1 4.71-4.71 4.715 4.715 0 0 1 4.71 4.71 4.715 4.715 0 0 1-4.71 4.709 4.715 4.715 0 0 1-4.71-4.71zm63.62-12.658c-1.415-5.608-7.785-12.023-15.241-14.182a26.983 26.983 0 0 0-6.202-1.34c-3.18-.312-6.273-.213-8.823-.213-7.697 0-11.485 1.61-18.36 5.47-2.883 1.62-5.371 3.427-6.95 4.657a8.433 8.433 0 0 1-3.476 1.593c-3.608.667-5.693 1.092-6.257 1.277-.846.277-2.775 1.107-4.375 2.964A10.239 10.239 0 0 0 3 42.658v7.083c0 .66.515 1.011.863 1.17.866.38 2.28.637 2.748.637h3.164c.19.39.413.76.668 1.109 1.653 2.569 5.282 4.375 8.25 4.375 3.38 0 6.216-2.341 6.993-5.484h25.082c.079.162.163.32.253.476 1.44 2.9 5.46 5.008 8.666 5.008 3.379 0 6.215-2.341 6.992-5.484h6.096a1.25 1.25 0 0 0 1.162-.79l.505-1.271c1.675-4.224 1.807-9.15.725-13.735z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M45.845 25.508l.55 7.862-22.717 1.59c-.276.019-1.128-.19.01-.95l.513-.388c1.362-1.013 3.294-2.345 5.485-3.55 5.78-3.179 9.876-4.673 16.159-4.564zm7.975.184c5.504.53 9.876 2.743 12.634 6.274L49.388 33.16l-.535-7.657c2.568.055 4.224.118 4.968.19z"
        />
      </g>
    </Pictogram>
  );
}

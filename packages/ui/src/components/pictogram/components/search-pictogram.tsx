'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function SearchPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Search',
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
          className={fill({ mode, highlight: true })}
          d="M18.641 35.799l-.127-1.243c-.449-4.38.48-7.95 2.762-10.61 3.564-4.153 9.097-4.477 9.331-4.49l1.248-.062.126 2.497-1.246.062c-.104.007-4.743.32-7.576 3.639-1.808 2.117-2.534 5.047-2.158 8.708l.127 1.244-2.487.255z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M61.276 68.744a4.509 4.509 0 0 1-3.209-1.329L41.79 51.138a1.248 1.248 0 0 0-1.452-.23 21.658 21.658 0 0 1-9.935 2.401C18.326 53.309 8.5 43.482 8.5 31.404 8.5 19.326 18.326 9.5 30.403 9.5c12.08 0 21.905 9.826 21.905 21.904 0 4.388-1.293 8.623-3.74 12.246a1.25 1.25 0 0 0 .152 1.583l15.764 15.764a4.506 4.506 0 0 1 1.33 3.209 4.506 4.506 0 0 1-1.33 3.209 4.505 4.505 0 0 1-3.208 1.329zM55 44.179a24.3 24.3 0 0 0 3.606-12.775C58.606 17.035 47.01 7 30.403 7 16.947 7 6 17.947 6 31.404s10.947 24.405 24.403 24.405c3.567 0 7.011-.764 10.25-2.273l15.646 15.647a6.976 6.976 0 0 0 3.897 1.97c1.516.191 3.573.153 5.016.083 1.344-.148 3.31-.523 4.838-2.053a6.99 6.99 0 0 0 2.062-4.977 6.99 6.99 0 0 0-2.062-4.977L55 44.179z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M30.305 47.243c-8.68 0-15.74-7.06-15.74-15.739 0-8.679 7.06-15.74 15.74-15.74 8.679 0 15.739 7.061 15.739 15.74 0 8.678-7.06 15.74-15.74 15.74m0-33.98c-10.056 0-18.238 8.182-18.238 18.24 0 10.057 8.182 18.24 18.239 18.24s18.239-8.183 18.239-18.24c0-10.058-8.182-18.24-18.24-18.24"
        />
      </g>
    </Pictogram>
  );
}

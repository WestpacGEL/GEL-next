'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function Number4Pictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Number 4',
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
          d="M38.675 41.513v-9.54l-6.417 9.54h6.417zm0 10.32v-5.616H27.25v-4.685l12.112-17.73h4.494v17.71h3.466v4.705h-3.466v5.617h-5.18z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.268 68.037C21.855 68.037 8.5 54.683 8.5 38.269S21.855 8.502 38.268 8.502s29.768 13.353 29.768 29.767-13.355 29.768-29.768 29.768m27.17-47.142C59.697 11.947 49.666 6 38.268 6 20.476 6 6 20.475 6 38.268c0 7.133 2.331 13.73 6.266 19.079C18.006 66.3 28.039 72.25 39.443 72.25c17.792 0 32.266-14.475 32.266-32.267a32.104 32.104 0 0 0-6.271-19.088"
        />
      </g>
    </Pictogram>
  );
}

'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function ShoppingPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Shopping',
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
          d="M25.435 22.395a1.25 1.25 0 0 0-1.036 1.433l3.009 18.728a1.25 1.25 0 0 0 2.468-.396l-3.008-18.73a1.25 1.25 0 0 0-1.433-1.035m11.631.813c-.69 0-1.25.56-1.25 1.25v17.9a1.25 1.25 0 0 0 2.5 0v-17.9c0-.69-.56-1.25-1.25-1.25m10.823.907a1.243 1.243 0 0 0-1.414 1.06l-2.428 17.006a1.249 1.249 0 1 0 2.474.354l2.429-17.006a1.25 1.25 0 0 0-1.061-1.414m10.097 1.063a1.253 1.253 0 0 0-1.52.903L52.308 42.42a1.25 1.25 0 1 0 2.423.616l4.158-16.337a1.25 1.25 0 0 0-.903-1.52"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M26.92 69.283a4.244 4.244 0 0 1-4.239-4.24 4.245 4.245 0 0 1 4.24-4.24 4.245 4.245 0 0 1 4.238 4.24 4.244 4.244 0 0 1-4.239 4.24m0-10.98a6.747 6.747 0 0 0-6.739 6.74c0 3.699 2.996 6.71 6.688 6.738h1.544c3.678-.046 6.657-3.05 6.657-6.737 0-3.671-2.952-6.661-6.606-6.733l-1.544-.007zm23.94 6.741a4.245 4.245 0 0 1 4.238-4.24 4.244 4.244 0 0 1 4.24 4.24 4.244 4.244 0 0 1-4.24 4.239 4.244 4.244 0 0 1-4.239-4.24zm4.238-6.74a6.747 6.747 0 0 0-6.739 6.74c0 3.698 2.996 6.709 6.688 6.737h1.544v-.002c3.678-.044 6.657-3.047 6.657-6.735 0-3.671-2.952-6.661-6.606-6.733l-1.544-.007zm6.689-11.606h-40.03l-.002-.007h-.017l-4.964-29.594 1.259.151.001.005 49.44 5.918-5.687 23.527zm11.24-25.946c-37.807-4.287-56.725-6.431-56.754-6.432l-1.28-6.43a1.256 1.256 0 0 0-.956-.978L5.52 5.03a1.25 1.25 0 0 0-.54 2.441l7.72 1.706c2.278 13.165 6.656 38.34 7.757 45.758a1.25 1.25 0 0 0 1.237 1.066h37.782a1.25 1.25 0 1 0 0-2.5H22.771l-.626-4.213h44.474c.621 0 1.162-.426 1.309-1.03l6.248-25.852a1.346 1.346 0 0 0-1.149-1.654z"
        />
      </g>
    </Pictogram>
  );
}

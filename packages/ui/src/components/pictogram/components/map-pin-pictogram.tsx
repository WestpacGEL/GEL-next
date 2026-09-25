'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function MapPinPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Map pin',
  copyrightYear = '2026',
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
          d="M39 7C50.5979 7 59.9998 16.5511 60 28.333C60 40.1151 39 71 39 71C39 71 18 40.1151 18 28.333C18.0002 16.5511 27.4021 7 39 7ZM38 10C28.335 10 20.5 17.91 20.5 27.667C20.5004 37.4243 38 63 38 63C38 63 55.4996 37.4243 55.5 27.667C55.5 17.91 47.665 10 38 10Z"
        />
        <circle className={fill({ mode, highlight: true })} cx="38" cy="27" r="8" />
      </g>
    </Pictogram>
  );
}

'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function GenericDocumentPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Generic document',
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
          className={fill({ mode, outline: true })}
          d="M56.4719,68.4324 L52.9119,68.4324 L16.0879,68.4324 C14.1099,68.4324 12.4999,66.8234 12.4999,64.8444
        L12.4999,9.5784 L56.4719,9.5784 L56.4719,63.3174 C56.6249,66.4534 57.6539,67.7374 59.4509,68.4324
        L56.4719,68.4324 Z M58.9719,56.4784 L58.9719,6.9994 L9.9999,6.9994 L9.9999,64.7664 C9.9999,68.1234
        12.7319,70.8544 16.0879,70.8544 L58.9719,70.8544 L58.9719,70.8444 L63.1169,70.8444 C65.4619,70.8444
        67.3649,68.9424 67.3649,66.5964 L67.3649,56.4784 L58.9719,56.4784 Z"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="18.655 18.872 50.317 18.872 50.317 15.871 18.655 15.871"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="18.655 27.169 50.317 27.169 50.317 24.169 18.655 24.169"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="18.655 35.467 50.317 35.467 50.317 32.467 18.655 32.467"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="18.654 43.764 39.83 43.764 39.83 40.764 18.654 40.764"
        />
      </g>
    </Pictogram>
  );
}

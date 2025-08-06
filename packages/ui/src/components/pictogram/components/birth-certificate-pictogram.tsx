'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function BirthCertificatePictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Birth certificate',
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
          points="18.654 18.872 50.317 18.872 50.317 15.871 18.654 15.871"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="18.654 26.474 50.317 26.474 50.317 23.474 18.654 23.474"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="18.654 34.077 50.317 34.077 50.317 31.076 18.654 31.076"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="18.654 41.678 50.317 41.678 50.317 38.678 18.654 38.678"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M56.4717,68.4326 L52.9117,68.4326 L16.0877,68.4326 C14.1097,68.4326 12.4997,66.8236 12.4997,64.8446 L12.4997,9.5786 L56.4717,9.5786 L56.4717,63.3166 C56.6247,66.4536 57.6537,67.7376 59.4507,68.4326 L56.4717,68.4326 Z M58.9717,56.4786 L58.9717,6.9996 L9.9997,6.9996 L9.9997,64.7666 C9.9997,68.1236 12.7317,70.8546 16.0877,70.8546 L58.9717,70.8546 L58.9717,70.8446 L63.1167,70.8446 C65.4627,70.8446 67.3647,68.9426 67.3647,66.5966 L67.3647,56.4786 L58.9717,56.4786 Z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M25.5527,63.1631 C29.6957,63.1631 33.0527,59.8061 33.0527,55.6631 C33.0527,51.5211 29.6957,48.1631 25.5527,48.1631 C21.4107,48.1631 18.0527,51.5211 18.0527,55.6631 C18.0527,59.8061 21.4107,63.1631 25.5527,63.1631"
        />
      </g>
    </Pictogram>
  );
}

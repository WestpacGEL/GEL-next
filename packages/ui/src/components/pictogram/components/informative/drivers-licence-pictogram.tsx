'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function DriversLicencePictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Drivers licence',
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
          fillRule="nonzero"
          d="M56.0127 42.0302C60.3477151 42.0302 63.9114924 45.2895846 64.0419975 49.3118788L64.0457 49.5403538 64.0457 52.7932769C64.0457 53.4521863 63.5016274 53.9664784 62.842525 54.0247034L62.7177 54.0302 39.2907 54.0302C38.6228856 54.0302 38.1129849 53.5578876 38.051856 52.9224482L38.0457 52.7932769 38.0457 49.5403538C38.0457 45.4903111 41.5290396 42.1557768 45.833209 42.0336644L46.0777 42.0302 56.0127 42.0302zM51.0459 23.0302C46.6267576 23.0302 43.0459 26.6110576 43.0459 31.0302 43.0459 33.257235 43.9609904 35.3392322 45.5462212 36.8402718 47.0217111 38.2373988 48.9720703 39.0302 51.0459 39.0302 55.4640424 39.0302 59.0459 35.4483424 59.0459 31.0302 59.0459 26.6113927 55.4643775 23.0302 51.0459 23.0302z"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="12.58 26.777 35.022 26.777 35.022 23.777 12.58 23.777"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="12.58 34.169 35.022 34.169 35.022 31.169 12.58 31.169"
        />
        <polygon
          className={fill({ mode, outline: true })}
          points="12.58 41.561 35.022 41.561 35.022 38.561 12.58 38.561"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M68.9297,56.333 C68.9297,57.621 67.8817,58.668 66.5947,58.668 L8.8347,58.668 C7.5477,58.668 6.4997,57.621 6.4997,56.333 L6.4997,19.782 C6.4997,18.495 7.5477,17.447 8.8347,17.447 L66.5947,17.447 C67.8817,17.447 68.9297,18.495 68.9297,19.782 L68.9297,56.333 Z M73.2947,19.595 C71.5487,17.035 68.7837,15.513 68.7837,15.513 C68.7837,15.513 68.7767,15.533 68.7727,15.542 C68.1157,15.207 67.3817,15 66.5947,15 L8.8347,15 C6.1687,15 3.9997,17.169 3.9997,19.835 L3.9997,56.386 C3.9997,57.058 4.1387,57.697 4.3877,58.279 C4.4167,58.472 4.5287,58.73 4.7717,59.091 C6.5157,61.672 9.3067,63.207 9.3067,63.207 C9.3067,63.207 9.3127,63.192 9.3147,63.188 C10.0037,63.567 10.7837,63.802 11.6247,63.802 L69.3847,63.802 C72.0517,63.802 74.2207,61.633 74.2207,58.967 L74.2207,22.416 C74.2207,21.361 73.8707,20.391 73.2947,19.595 L73.2947,19.595 Z"
        />
      </g>
    </Pictogram>
  );
}

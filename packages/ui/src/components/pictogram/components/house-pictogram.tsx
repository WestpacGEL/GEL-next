'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function HousePictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'House',
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
          className={fill({ mode, highlight: true })}
          points="26.843 67.963 41.563 73.985 41.563 51.654 26.829 45.602"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M57.4766,36.557 L57.4766,63.173 C57.4766,64.443 56.4466,65.473 55.1766,65.473 L47.2976,65.474 L47.2976,43.103 L24.3536,43.103 L24.3536,65.483 L14.1716,65.485 L14.1716,36.557 L7.4076,36.557 L35.8246,10.397 L64.2446,36.557 L57.4766,36.557 Z M41.1836,7 L35.8246,7 L0.9996,39.057 L11.6716,39.057 L11.6716,67.986 L17.0306,67.985 L17.0306,67.986 L22.5286,67.983 L26.8536,67.982 L26.8536,45.603 L44.7976,45.603 L44.7976,67.975 L51.1566,67.974 L51.1566,67.975 L58.8446,67.974 C62.4296,67.973 65.3356,65.066 65.3356,61.48 L65.3356,39.057 L70.6516,39.057 L76.0106,39.057 L41.1836,7 Z"
        />
      </g>
    </Pictogram>
  );
}

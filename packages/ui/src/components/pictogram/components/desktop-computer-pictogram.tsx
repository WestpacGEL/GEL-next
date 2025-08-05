'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function DesktopComputerPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Desktop computer',
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
          d="M12.936,47.6466 L61.229,47.6466 L61.229,17.1096 L12.936,17.1096 L12.936,47.6466 Z M61.987,14.6096 L12.177,14.6096 C11.217,14.6096 10.436,15.3906 10.436,16.3506 L10.436,48.4046 C10.436,49.3656 11.217,50.1466 12.177,50.1466 L61.987,50.1466 C62.947,50.1466 63.729,49.3656 63.729,48.4046 L63.729,16.3506 C63.729,15.3906 62.947,14.6096 61.987,14.6096 L61.987,14.6096 Z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M66.9102,51.145 C66.9102,52.309 65.9642,53.255 64.8002,53.255 L45.2362,53.255 L31.2322,53.255 L9.6102,53.255 C8.4462,53.255 7.5002,52.309 7.5002,51.145 L7.5002,13.611 C7.5002,12.447 8.4462,11.5 9.6102,11.5 L64.8002,11.5 C65.9642,11.5 66.9102,12.447 66.9102,13.611 L66.9102,51.145 Z M68.1412,9 L64.8002,9 L12.9522,9 L9.6102,9 C7.0682,9 5.0002,11.068 5.0002,13.611 L5.0002,51.145 C5.0002,53.687 7.0682,55.755 9.6102,55.755 L12.9522,55.755 L31.2322,55.755 L31.2322,60.515 L33.7322,60.515 L33.7322,55.755 L42.7362,55.755 L42.7362,60.515 L47.5492,60.515 L47.5492,55.755 L64.8002,55.755 L68.1412,55.755 C70.6842,55.755 72.7532,53.687 72.7532,51.145 L72.7532,13.611 C72.7532,11.068 70.6842,9 68.1412,9 L68.1412,9 Z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M53.8887,68.2934 L23.9137,68.2934 C23.2687,68.2934 22.7407,67.7654 22.7407,67.1204 L22.7407,66.7364 C22.7407,63.3144 25.5397,60.5154 28.9617,60.5154 L48.8407,60.5154 C52.2627,60.5154 55.0627,63.3144 55.0627,66.7364 L55.0627,67.1204 C55.0627,67.7654 54.5347,68.2934 53.8887,68.2934"
        />
      </g>
    </Pictogram>
  );
}

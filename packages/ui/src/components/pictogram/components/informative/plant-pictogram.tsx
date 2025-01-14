'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function PlantPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Plant',
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
          d="M14.432 12.509c-1.465 9.27.978 14.144 4.574 16.618 8.354 5.749 18.521-5.04 12.287-13.037-2.684-3.444-7.692-5.594-16.86-3.581"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M19.361 49.883h36.697v-4.558H19.361v4.558zm32.297 2.83l-1.653 17.12h-24.59l-1.685-17.45h19.199l8.764.056-.035.274zM43.48 11.962c2.045-2.972 5.564-4.466 10.492-4.466.991 0 2.056.078 3.16.198-2.198 1.658-7.975 6.378-13.046 13.646-2.041-2.351-2.95-5.973-.606-9.378zm14.884-2.067c.775 5.908-.442 10.162-3.645 12.659-2.978 2.322-6.297 1.944-8.731.415 4.711-6.821 10.118-11.344 12.376-13.074zm-1.146 32.93H38.081c.878-6.825 3.432-12.775 6.491-17.696.646.39 1.406.727 2.236 1 .477.171.966.312 1.469.411 1.494.351 3.033.527 4.262.527 2.014 0 4.127-.648 6.126-2.206 4.538-3.537 5.895-9.632 4.033-18.114a1.248 1.248 0 0 0-1.026-.967 83.38 83.38 0 0 0-3.722-.519c-7.872-.978-13.427.794-16.519 5.283-3.29 4.782-1.776 9.865 1.241 12.932-2.786 4.406-5.212 9.611-6.481 15.534-1.283-4.671-3.209-8.501-5.307-11.538-.557.653-1.272 1.252-1.976 1.741 2.782 4.097 4.633 8.655 5.56 13.612H18.111c-.69 0-1.25.56-1.25 1.25v7.058c0 .69.56 1.25 1.25 1.25h3.108l1.816 18.82c.038.389.262.704.567.906.314.306 1.261.89 3.926.89h26.86c.644 0 1.183-.489 1.244-1.13l1.829-18.937 3.095.117c.691 0 1.25-.56 1.25-1.25v-7.058c0-.463-.263-.851-.638-1.067-.923-.432-2.476-.849-3.95-.849z"
        />
      </g>
    </Pictogram>
  );
}

'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function ShopPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Shop',
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
          className={fill({ mode, outline: true })}
          d="M68.999 32.66c0 1.969-1.869 3.569-4.166 3.569-2.298 0-4.167-1.6-4.167-3.568v-3.57h8.333v3.57zM36.267 64.816l-.053-22.371-20.968.05.053 22.38-6.14.064-.101-26.395a7.26 7.26 0 0 0 1.609.186c2.231 0 4.206-1.007 5.416-2.544 1.211 1.537 3.186 2.544 5.417 2.544s4.206-1.007 5.416-2.544c1.211 1.537 3.186 2.544 5.417 2.544s4.206-1.007 5.417-2.544c1.21 1.537 3.185 2.544 5.416 2.544 2.231 0 4.206-1.007 5.417-2.544 1.21 1.537 3.185 2.544 5.416 2.544 2.231 0 4.206-1.007 5.417-2.545 1.121 1.424 2.9 2.382 4.929 2.518l.095 23.793a2.3 2.3 0 0 1-2.294 2.306l-25.879.014zM6.5 29.092h8.333v3.569c0 1.968-1.869 3.568-4.166 3.568-2.298 0-4.167-1.6-4.167-3.568v-3.57zm19.166 0v3.569c0 1.968-1.869 3.568-4.166 3.568-2.298 0-4.167-1.6-4.167-3.568v-3.57h8.333zm10.834 0v3.569c0 1.968-1.869 3.568-4.166 3.568-2.298 0-4.167-1.6-4.167-3.568v-3.57H36.5zm10.833 0v3.569c0 1.968-1.869 3.568-4.166 3.568-2.298 0-4.167-1.6-4.167-3.568v-3.57h8.333zm10.833 0v3.569c0 1.968-1.869 3.568-4.166 3.568-2.298 0-4.167-1.6-4.167-3.568v-3.57h8.333zM12.131 13.5h51.237l5.058 13.092H7.073L12.131 13.5zm56.399-1.7a1.25 1.25 0 0 0-1.166-.8H11.273c-.516 0-.979.318-1.166.8L4.084 27.39a1.227 1.227 0 0 0-.074.405L4 32.66c0 1.935 1.004 3.658 2.56 4.77l.103 29.427a.588.588 0 0 0 .59.585l10.552-.04v-.036l-.053-22.38 15.968-.037.053 22.372 30.611-.026a5.852 5.852 0 0 0 5.849-5.868l-.075-23.041c2.604-.827 4.481-3.078 4.481-5.726v-.78c0-2.833-.519-5.612-1.54-8.26L68.53 11.8z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M44.416 54.891H57.42v-9.884H44.416v9.884zm-2.5 2.5H59.92V42.507H41.916v14.884z"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="17.805 67.403 30.903 73.366 30.903 51.035 17.75 44.983"
        />
      </g>
    </Pictogram>
  );
}

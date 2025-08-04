'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function BuildingPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Building',
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
          d="M14.026 23.194H21a.32.32 0 0 0 .32-.32v-6.782a.32.32 0 0 0-.32-.319h-6.973a.32.32 0 0 0-.319.32v6.781c0 .177.142.32.32.32m12.497 0h6.973a.32.32 0 0 0 .32-.32v-6.782a.32.32 0 0 0-.32-.319h-6.973a.32.32 0 0 0-.319.32v6.781c0 .177.142.32.32.32m-12.5 12.568H21a.32.32 0 0 0 .32-.32V28.66a.32.32 0 0 0-.32-.319h-6.973a.32.32 0 0 0-.319.319v6.782c0 .177.142.32.32.32m19.535-7.422h-6.972a.32.32 0 0 0-.32.32v6.783a.32.32 0 0 0 .32.319h6.972a.32.32 0 0 0 .32-.32v-6.781a.32.32 0 0 0-.32-.32M14.026 48.33H21a.32.32 0 0 0 .32-.32v-6.782a.32.32 0 0 0-.32-.32h-6.973a.32.32 0 0 0-.319.32v6.783c0 .176.142.319.32.319m12.531 0h6.973a.32.32 0 0 0 .319-.32v-6.782a.32.32 0 0 0-.32-.32H26.56a.32.32 0 0 0-.32.32v6.783a.32.32 0 0 0 .32.319M14.026 60.898H21a.32.32 0 0 0 .32-.32v-6.782a.32.32 0 0 0-.32-.32h-6.973a.32.32 0 0 0-.319.32v6.783c0 .176.142.319.32.319m19.569-7.421h-6.973a.32.32 0 0 0-.32.319v6.783a.32.32 0 0 0 .32.319h6.973a.319.319 0 0 0 .319-.32v-6.782a.32.32 0 0 0-.32-.32"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M40.629 65.254h21.069V29.947H40.629v35.307zm-31.129 0h28.629V11.5H9.5v53.754zm60.538-36.943a.859.859 0 0 0-.859-.856l-22.791-.008V9.868A.87.87 0 0 0 45.52 9H8.25C7.56 9 7 9.56 7 10.25v56.254c0 .69.56 1.25 1.25 1.25l55.405.028a6.494 6.494 0 0 0 6.476-6.509l-.093-32.962z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M57.179 39.022h-12.03a.214.214 0 0 1-.213-.214v-4.283c0-.118.096-.214.213-.214h12.03c.117 0 .213.096.213.214v4.283a.214.214 0 0 1-.213.214m0 9.165h-12.03a.214.214 0 0 1-.213-.213V43.69c0-.117.096-.213.213-.213h12.03c.117 0 .213.096.213.213v4.284a.214.214 0 0 1-.213.213m0 9.166h-12.03a.214.214 0 0 1-.213-.214v-4.283c0-.118.096-.214.213-.214h12.03c.117 0 .213.096.213.214v4.283a.214.214 0 0 1-.213.214"
        />
      </g>
    </Pictogram>
  );
}

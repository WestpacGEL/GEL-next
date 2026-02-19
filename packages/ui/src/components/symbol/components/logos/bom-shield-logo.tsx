import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function BOMShieldLogo({
  'aria-label': ariaLabel = 'Bank of Melbourne',
  copyrightYear = '2025',
  viewBoxWidth = 26,
  viewBoxHeight = 39,
  className,
  ...props
}: SymbolProps) {
  return (
    <Symbol
      className={clsx('h-[39px] w-[26px]', className)}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      {...props}
    >
      <g clipPath="url(#clip0_139_1431)">
        <path d="M0 0V13L6.5 6.5L0 0Z" fill="#685AC0" />
        <path d="M13 0H0L6.5 6.5L13 0Z" fill="#A094FC" />
        <path d="M13 13V0L6.5 6.5L13 13Z" fill="#685AC0" />
        <path d="M0 13H13L6.5 6.5L0 13Z" fill="#20024E" />
        <path d="M13 0V13L19.5 6.5L13 0Z" fill="#C2BFEB" />
        <path d="M26 0H13L19.5 6.5L26 0Z" fill="#685AC0" />
        <path d="M26 13V0L19.5 6.5L26 13Z" fill="#20024E" />
        <path d="M13 13H26L19.5 6.5L13 13Z" fill="#685AC0" />
        <path d="M13 13V26L19.5 19.5L13 13Z" fill="#C2BFEB" />
        <path d="M26 13H13L19.5 19.5L26 13Z" fill="#A094FC" />
        <path d="M26 26V13L19.5 19.5L26 26Z" fill="#685AC0" />
        <path d="M13 26H26L19.5 19.5L13 26Z" fill="#20024E" />
        <path d="M0 13V26L6.5 19.5L0 13Z" fill="#685AC0" />
        <path d="M13 13H0L6.5 19.5L13 13Z" fill="#C2BFEB" />
        <path d="M13 26V13L6.5 19.5L13 26Z" fill="#20024E" />
        <path d="M0 26H13L6.5 19.5L0 26Z" fill="#A094FC" />
        <path d="M13 26V39L19.5 32.5L13 26Z" fill="#C2BFEB" />
        <path d="M26 26H13L19.5 32.5L26 26Z" fill="#685AC0" />
        <path d="M13 26H0L6.5 32.5L13 26Z" fill="#C2BFEB" />
        <path d="M13 39V26L6.5 32.5L13 39Z" fill="#20024E" />
      </g>
      <defs>
        <clipPath id="clip0_139_1431">
          <rect width="26" height="39" fill="white" />
        </clipPath>
      </defs>
    </Symbol>
  );
}

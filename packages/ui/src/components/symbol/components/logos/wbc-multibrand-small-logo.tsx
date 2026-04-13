import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function WBCMultibrandSmallLogo({
  'aria-label': ariaLabel = 'Westpac',
  copyrightYear = '2025',
  viewBoxWidth = 122,
  viewBoxHeight = 44,
  align = 'left',
  offset = [null, 35, 70],
  className,
  ...props
}: SymbolProps) {
  return (
    <Symbol
      className={clsx('h-[44px] w-[122px]', className)}
      aria-label={ariaLabel}
      align={align}
      offset={offset}
      copyrightYear={copyrightYear}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.515 30.778L38.643 15.075C39.368 12.677 40.598 12 42.478 12H52C51.252 12.301 50.757 14.206 50.757 14.206L46.159 29.977C45.628 31.957 43.97 33 42.092 33H32C32.723 32.87 33.516 30.778 33.516 30.778H33.515ZM18.482 30.778C18.482 30.778 19.275 32.87 20 33H9.908C8.027 33 6.37 31.957 5.84 29.977L1.244 14.207C1.244 14.207 0.748 12.3 0 12H9.52C11.399 12 12.628 12.677 13.356 15.075L18.482 30.778ZM20.5 33V12H31.5V33H20.5Z"
        fill="#DA1710"
      />
    </Symbol>
  );
}

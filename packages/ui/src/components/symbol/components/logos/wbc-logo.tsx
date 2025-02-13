import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function WBCLogo({
  'aria-label': ariaLabel = 'Westpac',
  copyrightYear = '2025',
  viewBoxWidth = 69,
  viewBoxHeight = 28,
  className,
  ...props
}: SymbolProps) {
  return (
    <Symbol
      className={clsx('h-[28px] w-[69px]', className)}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      {...props}
    >
      <path
        d="M24.4 25L17.6 4.1C16.7 0.9 15 0 12.6 0H0c1 0.4 1.6 2.9 1.6 2.9l6.1 21c0.7 2.6 2.9 4 5.4 4h13.3C25.4 27.8 24.4 25 24.4 25"
        fill="#DA1710"
      />
      <path
        d="M44.6 25l6.8-20.9C52.3 0.9 54 0 56.4 0H69c-1 0.4-1.6 2.9-1.6 2.9l-6.1 21c-0.7 2.6-2.9 4-5.4 4H42.6C43.6 27.8 44.6 25 44.6 25"
        fill="#DA1710"
      />
      <rect x="27" width="15" height="28" fill="#DA1710" />
    </Symbol>
  );
}

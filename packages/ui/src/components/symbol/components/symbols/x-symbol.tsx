import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const XSymbol = ({
  'aria-label': ariaLabel = 'X',
  copyrightYear = '',
  viewBoxWidth = 32,
  viewBoxHeight = 32,
  className,
  ...props
}: SymbolProps) => (
  <Symbol
    className={clsx('size-[32px]', className)}
    aria-label={ariaLabel}
    copyrightYear={copyrightYear}
    viewBoxWidth={viewBoxWidth}
    viewBoxHeight={viewBoxHeight}
    {...props}
  >
    <g clipPath="url(#clip0_1842_16)">
      <path
        d="M30 0H2C0.89543 0 0 0.89543 0 2V30C0 31.1046 0.89543 32 2 32H30C31.1046 32 32 31.1046 32 30V2C32 0.89543 31.1046 0 30 0Z"
        fill="black"
      />
      <path
        d="M18.093 14.1624L26.283 4H24.3422L17.2308 12.8238L11.551 4H5L13.589 17.3432L5 28H6.94088L14.4507 18.6817L20.449 28H27L18.0925 14.1624H18.093ZM15.4347 17.4608L14.5644 16.1321L7.6402 5.55962H10.6213L16.2092 14.0919L17.0795 15.4206L24.3431 26.5113H21.3621L15.4347 17.4613V17.4608Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1842_16">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </Symbol>
);

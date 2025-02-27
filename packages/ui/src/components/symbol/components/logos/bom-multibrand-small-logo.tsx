import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function BOMMultibrandSmallLogo({
  'aria-label': ariaLabel = 'Bank of Melbourne',
  copyrightYear = '2025',
  viewBoxWidth = 122,
  viewBoxHeight = 44,
  align = 'left',
  offset = [null, 48, 96],
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
      <polygon fill="#685AC0" points="0 16.001 6.5 9.501 0 3.001" />
      <polygon fill="#A094FC" points=".001 3.001 6.501 9.501 13 3.001" />
      <polygon fill="#685AC0" points="13 16.001 13 3.001 6.5 9.502" />
      <polygon fill="#20024E" points=".001 16.001 13 16.001 6.5 9.501" />
      <polygon fill="#C2BFEB" points="13 3.001 13 16.001 19.5 9.501" />
      <polygon fill="#685AC0" points="26 3.001 13 3.001 19.5 9.501" />
      <polygon fill="#20024E" points="26 16 26 3 19.5 9.502" />
      <polygon fill="#685AC0" points="13.001 16.001 26 16.001 19.5 9.501" />
      <polygon fill="#C2BFEB" points="13 16.001 13 29.001 19.5 22.501" />
      <polygon fill="#A094FC" points="26 16 13 16.001 19.5 22.501" />
      <polygon fill="#685AC0" points="26 29 26 16 19.5 22.502" />
      <polygon fill="#20024E" points="13.001 29.001 26 29 19.5 22.501" />
      <polygon fill="#685AC0" points="0 29.001 6.5 22.5 0 16" />
      <polygon fill="#C2BFEB" points=".001 16.001 6.501 22.501 13 16.001" />
      <polygon fill="#20024E" points="13 29.001 13 16.001 6.5 22.502" />
      <polygon fill="#A094FC" points=".001 29.001 13 29.001 6.5 22.5" />
      <polygon fill="#C2BFEB" points="13 42 19.501 35.501 13 29.001" />
      <polygon fill="#685AC0" points="26 29 13 29 19.5 35.501" />
      <polygon fill="#C2BFEB" points="0 29 6.501 35.501 13 29" />
      <polygon fill="#20024E" points="6.5 35.502 13 42 13 29.001" />
    </Symbol>
  );
}

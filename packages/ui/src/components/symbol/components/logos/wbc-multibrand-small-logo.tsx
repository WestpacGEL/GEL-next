import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function WBCMultibrandSmallLogo({
  'aria-label': ariaLabel = 'Westpac',
  copyrightYear = '2023',
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
        fill="#DA1710"
        d="M33.515 30.778l5.128-15.703C39.368 12.677 40.598 12 42.478 12H52c-.748.301-1.243 2.206-1.243 2.206l-4.598 15.771C45.628 31.957 43.97 33 42.092 33H32c.723-.13 1.516-2.222 1.516-2.222zm-15.033 0S19.275 32.87 20 33H9.908c-1.881 0-3.538-1.043-4.068-3.023l-4.596-15.77S.748 12.3 0 12h9.52c1.879 0 3.108.677 3.836 3.075l5.126 15.703zM20.5 33V12h11v21h-11z"
        fillRule="evenodd"
      />
    </Symbol>
  );
}

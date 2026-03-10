import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const FacebookSymbol = ({
  'aria-label': ariaLabel = 'Facebook',
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
    <path
      d="M30 0H2C0.89543 0 0 0.89543 0 2V30C0 31.1046 0.89543 32 2 32H30C31.1046 32 32 31.1046 32 30V2C32 0.89543 31.1046 0 30 0Z"
      className="fill-[#0866FF]"
    />
    <path
      d="M27.9995 15.9998C27.9995 9.37253 22.627 4 15.9998 4C9.37253 4 4 9.37253 4 15.9998C4 21.6272 7.87448 26.3493 13.1011 27.6462V19.6669H10.6267V15.9998H13.1011V14.4196C13.1011 10.3354 14.9495 8.44231 18.9594 8.44231C19.7197 8.44231 21.0315 8.59159 21.5681 8.74039V12.0643C21.2849 12.0346 20.7929 12.0197 20.1819 12.0197C18.2144 12.0197 17.4541 12.7651 17.4541 14.7028V15.9998H21.3737L20.7003 19.6669H17.4541V27.9117C23.3959 27.1941 28 22.135 28 15.9998H27.9995Z"
      className="fill-white"
    />
    <path
      d="M20.7 19.667L21.3735 15.9998H17.4538V14.7029C17.4538 12.7652 18.2142 12.0198 20.1816 12.0198C20.7927 12.0198 21.2847 12.0346 21.5678 12.0644V8.74046C21.0312 8.59118 19.7194 8.44238 18.9591 8.44238C14.9493 8.44238 13.1008 10.3355 13.1008 14.4197V15.9998H10.6265V19.667H13.1008V27.6463C14.0291 27.8767 15.0001 27.9996 15.9995 27.9996C16.4915 27.9996 16.9767 27.9694 17.4534 27.9118V19.667H20.6995H20.7Z"
      className="fill-[#0866FF]"
    />
  </Symbol>
);

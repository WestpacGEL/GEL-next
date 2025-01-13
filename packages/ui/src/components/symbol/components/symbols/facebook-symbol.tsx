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
    <g fillRule="nonzero" fill="none">
      <rect fill="#3C619D" width="32" height="32" rx="2" />
      <path
        d="M22.1 32V19.6h4.2l.6-4.8h-4.8v-3.1c0-1.4.4-2.4 2.4-2.4H27V5c-1.227-.158-2.463-.225-3.7-.2-3.7 0-6.2 2.3-6.2 6.4v3.6h-4.2v4.8h4.2V32h5z"
        fill="#FFF"
      />
    </g>
  </Symbol>
);

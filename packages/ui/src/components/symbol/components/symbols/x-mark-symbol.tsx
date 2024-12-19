import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const XMarkSymbol = ({
  'aria-label': ariaLabel = 'X',
  copyrightYear = '',
  viewBoxWidth = 32,
  viewBoxHeight = 32,
  className,
  ...props
}: SymbolProps) => (
  <Symbol
    className={clsx('h-[32px] w-[32px]', className)}
    aria-label={ariaLabel}
    copyrightYear={copyrightYear}
    viewBoxWidth={viewBoxWidth}
    viewBoxHeight={viewBoxHeight}
    {...props}
  >
    <path
      fill="#000"
      d="M44.635 32.455 72.555 0H65.94L41.696 28.18 22.333 0H0l29.28 42.614L0 76.648h6.617l25.601-29.76 20.449 29.76H75L44.634 32.455h.001ZM35.573 42.99l-2.967-4.243L9.001 4.98h10.162l19.05 27.25 2.967 4.243 24.762 35.42H55.78L35.573 42.99v-.002Z"
    />
  </Symbol>
);

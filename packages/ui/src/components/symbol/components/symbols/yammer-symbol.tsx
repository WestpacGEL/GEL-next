import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const YammerSymbol = ({
  'aria-label': ariaLabel = 'Yammer',
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
    <g fill="none" fillRule="evenodd">
      <rect fill="#0072C6" width="32" height="32" rx="2" />
      <path
        d="M27.95 17.994c-3.018 0-7.253-.338-7.597-1.03-.344-.702 6.532-1.456 7.49-1.458.056 0 .11 0 .163.003.534.117.95.575.99 1.15.044.652-.414 1.224-1.046 1.334M25.95 24.456c-.313.484-.897.686-1.424.533-.046-.026-.094-.05-.145-.08-.837-.46-6.502-4.43-5.863-4.877.636-.445 4.51 1.3 7.157 2.75.5.4.628 1.122.275 1.673M17.925 7.706l-6.023 15.026c-1.02 2.595-2.04 4.373-5.128 4.373-.41 0-.865-.03-1.31-.107-.613-.176-.975-.812-.808-1.43.146-.542.65-.894 1.19-.866.037.003.6.037.762.037 1.675 0 2.405-1.043 3.192-3.267L4.193 7.793c-.226-.693.128-1.447.817-1.706.672-.252 1.418.032 1.72.67L11.18 18h.067L15.48 6.84c.238-.646.942-.984 1.607-.772.677.217 1.055.957.838 1.638M24.38 8.716l.146-.076c.527-.153 1.11.047 1.423.532.352.55.225 1.273-.276 1.674-2.647 1.45-6.52 3.193-7.157 2.75-.64-.45 5.026-4.418 5.864-4.88"
        fill="#FFF"
      />
    </g>
  </Symbol>
);

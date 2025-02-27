import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const InstagramSymbol = ({
  'aria-label': ariaLabel = 'Instagram',
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
    <defs>
      <radialGradient
        cx="29.515%"
        cy="110.173%"
        fx="29.515%"
        fy="110.173%"
        r="157.89%"
        gradientTransform="matrix(-.4 -.9 .95 -.43 -.63 1.84)"
        id="InstagramSymbol"
      >
        <stop stopColor="#F9ED65" offset="0%" />
        <stop stopColor="#F8E462" offset="8.118%" />
        <stop stopColor="#F7CA59" offset="13.824%" />
        <stop stopColor="#F5A14C" offset="20.219%" />
        <stop stopColor="#F16839" offset="30.1%" />
        <stop stopColor="#F0524E" offset="38.409%" />
        <stop stopColor="#EE2A7B" offset="47.577%" />
        <stop stopColor="#002AFF" offset="100%" />
      </radialGradient>
    </defs>
    <g fillRule="nonzero" fill="none">
      <rect fill="url(#InstagramSymbol)" width="32" height="32" rx="2" />
      <path
        d="M12 16c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4m-2.16 0c0 3.402 2.758 6.16 6.16 6.16s6.16-2.758 6.16-6.16S19.402 9.84 16 9.84 9.84 12.598 9.84 16M21 9.59c0 .795.645 1.44 1.44 1.44.795 0 1.44-.645 1.44-1.44 0-.795-.645-1.44-1.44-1.44-.382 0-.748.152-1.018.422S21 9.208 21 9.59m-9.85 16.18c-.76-.008-1.516-.146-2.23-.41-1.046-.406-1.874-1.234-2.28-2.28-.264-.714-.402-1.47-.41-2.23-.06-1.27-.07-1.65-.07-4.85 0-3.2 0-3.58.07-4.85.008-.76.146-1.516.41-2.23.41-1.042 1.236-1.866 2.28-2.27.714-.264 1.47-.402 2.23-.41 1.27-.06 1.64-.07 4.85-.07s3.58 0 4.85.07c.76.008 1.516.146 2.23.41 1.046.406 1.874 1.234 2.28 2.28.264.714.402 1.47.41 2.23.06 1.27.07 1.64.07 4.85s0 3.58-.07 4.85c-.008.76-.146 1.516-.41 2.23-.406 1.046-1.234 1.874-2.28 2.28-.714.264-1.47.402-2.23.41-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07m-.1-21.7c-.995.02-1.98.21-2.91.56-1.61.622-2.884 1.892-3.51 3.5-.35.93-.54 1.915-.56 2.91C4 12.33 4 12.74 4 16c0 3.26 0 3.67.07 4.95.02.995.21 1.98.56 2.91.624 1.612 1.898 2.886 3.51 3.51.93.35 1.915.54 2.91.56 1.28.07 1.69.07 4.95.07 3.26 0 3.67 0 4.95-.07.995-.02 1.98-.21 2.91-.56 1.612-.624 2.886-1.898 3.51-3.51.35-.93.54-1.915.56-2.91.07-1.28.07-1.69.07-4.95 0-3.26 0-3.67-.07-4.95-.02-.995-.21-1.98-.56-2.91-.624-1.612-1.898-2.886-3.51-3.51-.93-.35-1.915-.54-2.91-.56C19.67 4 19.26 4 16 4c-3.26 0-3.67 0-4.95.07"
        fill="#FFF"
      />
    </g>
  </Symbol>
);

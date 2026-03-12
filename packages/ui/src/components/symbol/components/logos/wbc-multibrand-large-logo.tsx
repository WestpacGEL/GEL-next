import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function WBCMultibrandLargeLogo({
  'aria-label': ariaLabel = 'Westpac',
  copyrightYear = '2025',
  viewBoxWidth = 180,
  viewBoxHeight = 65,
  align = 'left',
  offset = [null, 55.5, 111],
  className,
  ...props
}: SymbolProps) {
  return (
    <Symbol
      className={clsx('h-[65px] w-[180px]', className)}
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
        d="M24.385 45.038C24.385 45.038 25.432 47.828 26.387 48H13.072C10.591 48 8.404 46.61 7.706 43.97L1.643 22.941C1.643 22.941 0.987 20.401 0 20.001H12.561C15.04 20.001 16.662 20.902 17.622 24.101L24.385 45.038ZM44.612 45.038L51.379 24.101C52.337 20.902 53.958 20.001 56.438 20.001H69C68.01 20.401 67.358 22.941 67.358 22.941L61.293 43.971C60.593 46.609 58.407 48.001 55.929 48.001H42.613C43.566 47.827 44.611 45.038 44.611 45.038H44.612ZM27 48V20H42V48H27Z"
        fill="#DA1710"
      />
    </Symbol>
  );
}

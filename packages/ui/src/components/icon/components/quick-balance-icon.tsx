import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function QuickBalanceIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Quick Balance',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          d="M24 14c0 3.073-1.155 5.877-3.056 8H3.056A11.955 11.955 0 0 1 0 14C0 7.373 5.373 2 12 2s12 5.373 12 12Zm-3.877-3.88-1.528 1.528c.262.735.405 1.527.405 2.352 0 1.277-.34 2.47-.936 3.5a1 1 0 0 0 1.731 1A8.963 8.963 0 0 0 21 14c0-1.39-.315-2.705-.877-3.88ZM15.88 5.877A9 9 0 0 0 4.204 18.501a1 1 0 0 0 1.732-1.002 7 7 0 0 1 8.416-10.094l1.528-1.528Zm2.827 2.83a1 1 0 0 0-1.414-1.414l-4.775 4.775a2 2 0 1 0 1.414 1.414l4.775-4.775Z"
          clipRule="evenodd"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="m17.797 12.446 1.57-1.57c.407.96.633 2.016.633 3.124a7.983 7.983 0 0 1-.526 2.857 1 1 0 1 1-1.868-.714A5.984 5.984 0 0 0 18 14a6.01 6.01 0 0 0-.203-1.554ZM12 6c1.108 0 2.164.225 3.124.633l-1.57 1.57a6 6 0 0 0-7.16 7.94 1 1 0 1 1-1.868.714A8 8 0 0 1 12 6ZM17.293 7.293a1 1 0 1 1 1.414 1.414l-4.775 4.775a2 2 0 1 1-1.414-1.414l4.775-4.775Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            d="M24 14c0 3.073-1.155 5.877-3.056 8H3.056A11.955 11.955 0 0 1 0 14C0 7.373 5.373 2 12 2s12 5.373 12 12Zm-2 0a9.947 9.947 0 0 1-2 6H4a9.948 9.948 0 0 1-2-6C2 8.477 6.477 4 12 4s10 4.477 10 10Z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

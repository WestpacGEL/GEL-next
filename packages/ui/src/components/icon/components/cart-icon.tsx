import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CartIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Cart',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M0 2H1.41597C1.88002 2 2.2831 2.31925 2.38939 2.77096L5.66378 16.6871C5.98264 18.0423 7.19187 19 8.58403 19H21V17H8.58403C8.11998 17 7.7169 16.6808 7.61061 16.229L7.32143 15H20.3604C21.3138 15 22.1346 14.3271 22.3216 13.3922L24 5H4.96849L4.33622 2.31288C4.01736 0.957735 2.80813 0 1.41597 0H0V2Z"
            fill="currentColor"
          />
          <path
            d="M11 22C11 23.1046 10.1046 24 9 24C7.89543 24 7 23.1046 7 22C7 20.8954 7.89543 20 9 20C10.1046 20 11 20.8954 11 22Z"
            fill="currentColor"
          />
          <path
            d="M18 24C19.1046 24 20 23.1046 20 22C20 20.8954 19.1046 20 18 20C16.8954 20 16 20.8954 16 22C16 23.1046 16.8954 24 18 24Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2H1.41597C1.88002 2 2.2831 2.31925 2.38939 2.77096L5.66378 16.6871C5.98264 18.0423 7.19187 19 8.58403 19H21V17H8.58403C8.11998 17 7.7169 16.6808 7.61061 16.229L7.32143 15H20.3604C21.3138 15 22.1346 14.3271 22.3216 13.3922L24 5H4.96849L4.33622 2.31288C4.01736 0.957735 2.80813 0 1.41597 0H0V2ZM5.43907 7L6.85084 13L20.3604 13L21.5604 7H5.43907Z"
            fill="currentColor"
          />
          <path
            d="M11 22C11 23.1046 10.1046 24 9 24C7.89543 24 7 23.1046 7 22C7 20.8954 7.89543 20 9 20C10.1046 20 11 20.8954 11 22Z"
            fill="currentColor"
          />
          <path
            d="M18 24C19.1046 24 20 23.1046 20 22C20 20.8954 19.1046 20 18 20C16.8954 20 16 20.8954 16 22C16 23.1046 16.8954 24 18 24Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

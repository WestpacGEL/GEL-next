import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CreditCardsIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Credit Cards',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M22 2H5.99999C4.88999 2 4.00999 2.89 4.00999 4L4.00916 5H5.99999V4H22V16H21V18H22C23.11 18 24 17.11 24 16V4C24 2.89 23.11 2 22 2Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 6H2C0.89 6 0.01 6.89 0.01 8L0 20C0 21.11 0.89 22 2 22H18C19.11 22 20 21.11 20 20V8C20 6.89 19.11 6 18 6ZM1 10H19V12H1V10Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M6 2H22C23.11 2 24 2.89 24 4V16C24 17.11 23.11 18 22 18H21V16H22V4H6V5H4.00917L4.01 4C4.01 2.89 4.89 2 6 2Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 6H18C19.11 6 20 6.89 20 8V20C20 21.11 19.11 22 18 22H2C0.89 22 0 21.11 0 20L0.00999999 8C0.00999999 6.89 0.89 6 2 6ZM2 20H18V12H2V20ZM2 10V8H18V10H2Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

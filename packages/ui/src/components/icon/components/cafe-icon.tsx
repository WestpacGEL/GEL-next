import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CafeIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Cafe',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 2H2V16C2 18.21 3.79 20 6 20H16C18.21 20 20 18.21 20 16V12H22C23.11 12 24 11.11 24 10V4C24 2.89 23.11 2 22 2ZM22 10H20V4H22V10ZM24 24H0V22H24V24Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 2H22C23.11 2 24 2.89 24 4V10C24 11.11 23.11 12 22 12H20V16C20 18.21 18.21 20 16 20H6C3.79 20 2 18.21 2 16V2ZM20 10V4H22V10H20ZM18 4H4V16C4 17.1054 4.89457 18 6 18H16C17.1054 18 18 17.1054 18 16V4Z"
            fill="currentColor"
          />
          <path d="M24 24H0V22H24V24Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

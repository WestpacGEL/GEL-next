import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CalendarIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Calendar',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 2H22C23.1046 2 24 2.89543 24 4V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V4C0 2.89543 0.89543 2 2 2H4V0H6V2H18V0H20V2ZM2 8H22V22H2V8ZM20 14H14V20H20V14Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M14 14H20V20H14V14Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 2H20V0H18V2H6V0H4V2H2C0.89543 2 0 2.89543 0 4V22C0 23.1046 0.89543 24 2 24H22C23.1046 24 24 23.1046 24 22V4C24 2.89543 23.1046 2 22 2ZM22 8H2V22H22V8ZM22 4H2V6H22V4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

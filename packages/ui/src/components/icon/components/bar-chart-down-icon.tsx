import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function BarChartDownIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Bar Chart Down',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 20H6V2H2V20ZM10 20H14V8H10V20ZM22 20H18V14H22V20ZM0 24H24V22H0V24Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M4 20H6V2H4V20Z" fill="currentColor" />
          <path d="M11 20H13V8H11V20Z" fill="currentColor" />
          <path d="M20 20H18V14H20V20Z" fill="currentColor" />
          <path d="M0 24H24V22H0V24Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

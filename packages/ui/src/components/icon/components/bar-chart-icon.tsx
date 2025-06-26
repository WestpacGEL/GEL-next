import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function BarChartIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Bar Chart',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 20H18V2H22V20ZM14 20H10V8H14V20ZM2 20H6V14H2V20ZM24 24H0V22H24V24Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M20 20H18V2H20V20Z" fill="currentColor" />
          <path d="M13 20H11V8H13V20Z" fill="currentColor" />
          <path d="M4 20H6V14H4V20Z" fill="currentColor" />
          <path d="M24 24H0V22H24V24Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

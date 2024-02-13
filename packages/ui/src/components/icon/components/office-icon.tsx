import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function OfficeIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Office',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 0L0 4V24H24V6H14V0ZM4 10H10V12H4V10ZM4 14H10V16H4V14ZM10 18H4V20H10V18ZM16 10H20V12H16V10ZM16 14H20V16H16V14ZM20 18H16V20H20V18Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M10 10H4V12H10V10Z" fill="currentColor" />
          <path d="M10 14H4V16H10V14Z" fill="currentColor" />
          <path d="M4 18H10V20H4V18Z" fill="currentColor" />
          <path d="M20 10H16V12H20V10Z" fill="currentColor" />
          <path d="M16 14H20V16H16V14Z" fill="currentColor" />
          <path d="M20 18H16V20H20V18Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 6V0L0 4V24H24V6H14ZM2 22V5.5086L12 2.65146V22H2ZM14 22V8H22V22H14Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

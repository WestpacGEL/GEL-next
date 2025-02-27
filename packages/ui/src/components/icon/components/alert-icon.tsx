import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function AlertIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Alert',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.00041 24C0.653409 24 0.33241 23.8197 0.14941 23.5241C-0.0325905 23.2286 -0.0495905 22.8599 0.105409 22.5503L11.1054 0.509565C11.4454 -0.169692 12.5554 -0.169692 12.8944 0.509565L23.8944 22.5503C24.0504 22.8599 24.0334 23.2286 23.8504 23.5241C23.6684 23.8197 23.3474 24 23.0004 24H1.00041ZM11 20.0001H13V18.0001H11V20.0001ZM13 16.0001H11V10.0001H13V16.0001Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M11 20H13V18H11V20Z" fill="currentColor" />
          <path d="M13 16H11V10H13V16Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.14941 23.5241C0.33241 23.8197 0.653409 24 1.00041 24H23.0004C23.3474 24 23.6684 23.8197 23.8504 23.5241C24.0334 23.2286 24.0504 22.8599 23.8944 22.5503L12.8944 0.509565C12.5554 -0.169692 11.4454 -0.169692 11.1054 0.509565L0.105409 22.5503C-0.0495905 22.8599 -0.0325905 23.2286 0.14941 23.5241ZM12.0004 3.19754L21.3824 22.0001H2.61841L12.0004 3.19754Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

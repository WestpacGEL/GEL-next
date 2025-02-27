import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function KeyIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Key',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.7101 14C12.8496 16.8915 10.171 19 7 19C3.13401 19 0 15.866 0 12C0 8.13401 3.13401 5 7 5C10.171 5 12.8496 7.10851 13.7101 10H24V14H22V18H18V14H13.7101ZM10 12C10 13.6569 8.65685 15 7 15C5.34315 15 4 13.6569 4 12C4 10.3431 5.34315 9 7 9C8.65685 9 10 10.3431 10 12Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 19H22V15H24V9H13.32C12.17 6.58 9.72 5 7 5C3.14 5 0 8.14 0 12C0 15.86 3.14 19 7 19C9.72 19 12.18 17.42 13.32 15H16V19ZM20 17H18V13H11.94L11.71 13.67C11.01 15.66 9.11 17 7 17C4.24 17 2 14.76 2 12C2 9.24 4.24 7 7 7C9.11 7 11.01 8.34 11.71 10.33L11.94 11H22V13H20V17Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

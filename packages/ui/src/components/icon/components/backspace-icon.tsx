import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function BackspaceIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Backspace',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 2H22C23.1 2 24 2.9 24 4V20C24 21.1 23.1 22 22 22H7C6.31 22 5.77 21.64 5.41 21.11L0 12L5.41 2.88C5.77 2.35 6.31 2 7 2ZM17.59 17L19 15.59L15.41 12L19 8.41L17.59 7L14 10.59L10.41 7L9 8.41L12.59 12L9 15.59L10.41 17L14 13.41L17.59 17Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M17.59 17L19 15.59L15.41 12L19 8.41L17.59 7L14 10.59L10.41 7L9 8.41L12.59 12L9 15.59L10.41 17L14 13.41L17.59 17Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 12L5.41 21.11C5.77 21.64 6.31 22 7 22H22C23.1 22 24 21.1 24 20V4C24 2.9 23.1 2 22 2H7C6.31 2 5.77 2.35 5.41 2.88L0 12ZM2.32575 11.9994L7.07103 4H22V20H7.0769L2.32575 11.9994ZM6.99981 4C6.99983 4 6.9997 4 6.99981 4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

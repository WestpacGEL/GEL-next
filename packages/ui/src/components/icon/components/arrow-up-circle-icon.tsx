import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowUpCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Up Circle',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M24 12c0-6.628-5.373-12-12-12S0 5.372 0 12s5.373 12 12 12 12-5.372 12-12ZM11 9.414l-3.293 3.293-1.414-1.414L12 5.586l5.707 5.707-1.414 1.414L13 9.414V18h-2V9.414Z"
          clipRule="evenodd"
        />
      ) : (
        <Fragment>
          <path
            fill="currentColor"
            d="m11 9.414-3.293 3.293-1.414-1.414L12 5.586l5.707 5.707-1.414 1.414L13 9.414V18h-2V9.414Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M24 12c0-6.628-5.373-12-12-12S0 5.372 0 12s5.373 12 12 12 12-5.372 12-12ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"
            clipRule="evenodd"
          />
        </Fragment>
      )}
    </Icon>
  );
}

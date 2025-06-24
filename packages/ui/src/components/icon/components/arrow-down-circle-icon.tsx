import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowDownCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Down Circle',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M0 12c0 6.628 5.373 12 12 12s12-5.372 12-12S18.627 0 12 0 0 5.372 0 12Zm13 2.586 3.293-3.293 1.414 1.414L12 18.414l-5.707-5.707 1.414-1.414L11 14.586V6h2v8.586Z"
          clipRule="evenodd"
        />
      ) : (
        <Fragment>
          <path
            fill="currentColor"
            d="m13 14.586 3.293-3.293 1.414 1.414L12 18.414l-5.707-5.707 1.414-1.414L11 14.586V6h2v8.586Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M0 12c0 6.628 5.373 12 12 12s12-5.372 12-12S18.627 0 12 0 0 5.372 0 12ZM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z"
            clipRule="evenodd"
          />
        </Fragment>
      )}
    </Icon>
  );
}

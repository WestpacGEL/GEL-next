import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowBackCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Back Circle',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0ZM9.414 13l3.293 3.293-1.414 1.414L5.586 12l5.707-5.707 1.414 1.414L9.414 11H18v2H9.414Z"
          clipRule="evenodd"
        />
      ) : (
        <Fragment>
          <path
            fill="currentColor"
            d="m9.414 13 3.293 3.293-1.414 1.414L5.586 12l5.707-5.707 1.414 1.414L9.414 11H18v2H9.414Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0Zm10 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
            clipRule="evenodd"
          />
        </Fragment>
      )}
    </Icon>
  );
}

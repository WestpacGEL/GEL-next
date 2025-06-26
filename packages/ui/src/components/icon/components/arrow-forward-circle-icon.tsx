import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowForwardCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Forward Circle',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 24c6.628 0 12-5.373 12-12S18.628 0 12 0 0 5.373 0 12s5.372 12 12 12Zm2.586-13-3.293-3.293 1.414-1.414L18.414 12l-5.707 5.707-1.414-1.414L14.586 13H6v-2h8.586Z"
          clipRule="evenodd"
        />
      ) : (
        <Fragment>
          <path
            fill="currentColor"
            d="m14.586 11-3.293-3.293 1.414-1.414L18.414 12l-5.707 5.707-1.414-1.414L14.586 13H6v-2h8.586Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 24c6.628 0 12-5.373 12-12S18.628 0 12 0 0 5.373 0 12s5.372 12 12 12ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z"
            clipRule="evenodd"
          />
        </Fragment>
      )}
    </Icon>
  );
}

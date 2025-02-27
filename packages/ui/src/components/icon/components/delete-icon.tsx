import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DeleteIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Delete',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M7 2L8 0H16L17 2H20C20.5523 2 21 2.44772 21 3V4H3V3C3 2.44772 3.44772 2 4 2H7Z"
            fill="currentColor"
          />
          <path d="M20 6H4V22C4 23.1046 4.89543 24 6 24H18C19.1046 24 20 23.1046 20 22V6Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M7 2L8 0H16L17 2H20C20.5523 2 21 2.44772 21 3V4H3V3C3 2.44772 3.44772 2 4 2H7Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 22V6H20V22C20 23.1046 19.1046 24 18 24H6C4.89543 24 4 23.1046 4 22ZM6 8H18V22H6V8Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

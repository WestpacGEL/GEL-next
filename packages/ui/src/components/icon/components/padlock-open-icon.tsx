import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PadlockOpenIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Padlock Open',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 8H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6H6C6 2.68629 8.68629 0 12 0C15.3137 0 18 2.68629 18 6V8H20C21.1046 8 22 8.89543 22 10V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22V10C2 8.89543 2.89543 8 4 8ZM12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8H4C2.89543 8 2 8.89543 2 10V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V10C22 8.89543 21.1046 8 20 8H18V6C18 2.68629 15.3137 0 12 0C8.68629 0 6 2.68629 6 6H8C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V8ZM4 10H20V22H4V10Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

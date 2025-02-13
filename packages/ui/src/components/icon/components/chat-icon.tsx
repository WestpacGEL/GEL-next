import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ChatIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Chat',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0C0.89543 0 0 0.89543 0 2V24L6 18H22C23.1046 18 24 17.1046 24 16V2C24 0.89543 23.1046 0 22 0H2ZM20 4H4V6H20V4ZM4 8H16V10H4V8ZM12 12H4V14H12V12Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M20 4H4V6H20V4Z" fill="currentColor" />
          <path d="M4 8H16V10H4V8Z" fill="currentColor" />
          <path d="M12 12H4V14H12V12Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2V24L6 18H22C23.1046 18 24 17.1046 24 16V2C24 0.89543 23.1046 0 22 0H2C0.89543 0 0 0.89543 0 2ZM22 16H5.17157L2 19.1716V2H22V16Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

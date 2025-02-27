import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function HelpIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Help',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C18.6278 24 24 18.627 24 12C24 5.373 18.6278 0 12 0C5.37225 0 0 5.373 0 12C0 18.627 5.37225 24 12 24ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 10.8792 13.4202 11.3236 12.7704 11.8217C11.9421 12.4566 11 13.1787 11 15H13C13 13.9046 13.711 13.2833 14.4408 12.6455C15.21 11.9733 16 11.2829 16 10C16 7.79 14.21 6 12 6ZM13 18V16H11V18H13Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M13 18V16H11V18H13Z" fill="currentColor" />
          <path
            d="M8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 11.2829 15.21 11.9733 14.4408 12.6455C13.711 13.2833 13 13.9046 13 15H11C11 13.1787 11.9421 12.4566 12.7704 11.8217C13.4202 11.3236 14 10.8792 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 24C18.6278 24 24 18.627 24 12C24 5.373 18.6278 0 12 0C5.37225 0 0 5.373 0 12C0 18.627 5.37225 24 12 24ZM2 12C2 6.47714 6.47714 2 12 2C17.5229 2 22 6.47714 22 12C22 17.5229 17.5229 22 12 22C6.47714 22 2 17.5229 2 12Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

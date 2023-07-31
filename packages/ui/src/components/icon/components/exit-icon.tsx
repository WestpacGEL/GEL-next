import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExitIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Exit',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M0 12C0 5.373 5.37225 0 12 0V2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12H24C24 18.627 18.6278 24 12 24C5.37225 24 0 18.627 0 12Z"
            fill="currentColor"
          />
          <path
            d="M22.0144 8V3.41682L12.4142 13.017L11 11.6028L20.6028 2H16.0144V0H24.0144V8H22.0144Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M0 12C0 5.373 5.37225 0 12 0V2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12H24C24 18.627 18.6278 24 12 24C5.37225 24 0 18.627 0 12Z"
            fill="currentColor"
          />
          <path
            d="M22.0144 8V3.41682L12.4142 13.017L11 11.6028L20.6028 2H16.0144V0H24.0144V8H22.0144Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

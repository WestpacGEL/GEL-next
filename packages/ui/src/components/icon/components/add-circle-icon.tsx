import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function AddCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Add Circle',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C18.6278 24 24 18.627 24 12C24 5.373 18.6278 0 12 0C5.37225 0 0 5.373 0 12C0 18.627 5.37225 24 12 24ZM6 11H11V6H13V11H18V13H13V18H11V13H6V11Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M6 11H11V6H13V11H18V13H13V18H11V13H6V11Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 12C24 18.627 18.6278 24 12 24C5.37225 24 0 18.627 0 12C0 5.373 5.37225 0 12 0C18.6278 0 24 5.373 24 12ZM12 2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47714 17.5229 2 12 2Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

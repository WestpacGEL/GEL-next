import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PauseCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Pause Circle',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12C24 18.627 18.6278 24 12 24C5.37225 24 0 18.627 0 12C0 5.373 5.37225 0 12 0C18.6278 0 24 5.373 24 12ZM9 16H11V8H9V16ZM15 16H13V8H15V16Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M9 16H11V8H9V16Z" fill="currentColor" />
          <path d="M15 16H13V8H15V16Z" fill="currentColor" />
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

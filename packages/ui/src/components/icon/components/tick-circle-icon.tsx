import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TickCircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Tick Circle',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <g clipPath="url(#clip0_2741_3297)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 12C24 5.373 18.628 0 12 0C5.372 0 0 5.373 0 12C0 18.627 5.372 24 12 24C18.628 24 24 18.627 24 12ZM9.99519 14.5891L17.2923 7.29199L18.7023 8.71199L9.99519 17.4191L5.28809 12.712L6.69809 11.302L9.99519 14.5891Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_2741_3297">
              <rect width="24" height="24" fill="currentColor" />
            </clipPath>
          </defs>
        </Fragment>
      ) : (
        <Fragment>
          <g clipPath="url(#clip0_2741_3296)">
            <path
              d="M9.99519 14.5891L17.2923 7.29199L18.7023 8.71199L9.99519 17.4191L5.28809 12.712L6.69809 11.302L9.99519 14.5891Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 12C24 5.373 18.628 0 12 0C5.372 0 0 5.373 0 12C0 18.627 5.372 24 12 24C18.628 24 24 18.627 24 12ZM2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_2741_3296">
              <rect width="24" height="24" fill="currentColor" />
            </clipPath>
          </defs>
        </Fragment>
      )}
    </Icon>
  );
}

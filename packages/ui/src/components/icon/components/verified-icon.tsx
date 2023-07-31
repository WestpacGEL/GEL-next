import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function VerifiedIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Verified',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 4.5L12 0L22 4.5V11C22 17.0545 17.7333 22.6255 12 24C6.26667 22.6255 2 17.0545 2 11V4.5ZM9.99519 14.5891L17.2923 7.29199L18.7023 8.71199L9.99519 17.4191L5.28809 12.712L6.69809 11.302L9.99519 14.5891Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M9.99519 14.5891L17.2923 7.29199L18.7023 8.71199L9.99519 17.4191L5.28809 12.712L6.69809 11.302L9.99519 14.5891Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 4.5L12 0L22 4.5V11C22 17.0545 17.7333 22.6255 12 24C6.26667 22.6255 2 17.0545 2 11V4.5ZM4 11V5.79317L12 2.19317L20 5.79317V11C20 16.0039 16.5623 20.5963 12 21.9311C7.43769 20.5963 4 16.0039 4 11Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

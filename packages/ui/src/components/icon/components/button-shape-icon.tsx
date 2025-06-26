import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ButtonShapeIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Button Shape',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          d="M2 20h4v2H2l-.204-.01A2 2 0 0 1 .01 20.203L0 20v-4h2v4ZM24 20l-.01.204a2 2 0 0 1-1.786 1.785L22 22h-4v-2h4v-4h2v4ZM16 8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8h8ZM6 4H2v4H0V4a2 2 0 0 1 1.796-1.99L2 2h4v2ZM22.204 2.01A2 2 0 0 1 24 4v4h-2V4h-4V2h4l.204.01Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M2 20h4v2H2l-.204-.01A2 2 0 0 1 .01 20.203L0 20v-4h2v4ZM24 20l-.01.204a2 2 0 0 1-1.786 1.785L22 22h-4v-2h4v-4h2v4Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.206 8.005A4 4 0 0 1 16 16H8l-.206-.005A4 4 0 0 1 8 8h8l.206.005ZM8 10a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4H8Z"
            fill="currentColor"
          />
          <path
            d="M6 4H2v4H0V4a2 2 0 0 1 1.796-1.99L2 2h4v2ZM22.204 2.01A2 2 0 0 1 24 4v4h-2V4h-4V2h4l.204.01Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

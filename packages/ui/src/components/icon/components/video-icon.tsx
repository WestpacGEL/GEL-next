import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function VideoIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Video',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          d="M16 4C17.1046 4 18 4.89543 18 6V9.5L24 5V19L18 14.5V18C18 19.1046 17.1046 20 16 20H2C0.89543 20 0 19.1046 0 18V6C0 4.89543 0.895431 4 2 4H16Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 6C0 4.89543 0.895431 4 2 4H16C17.1046 4 18 4.89543 18 6V9.5L24 5V19L18 14.5V18C18 19.1046 17.1046 20 16 20H2C0.89543 20 0 19.1046 0 18V6ZM2 6H16V18H2L2 6Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

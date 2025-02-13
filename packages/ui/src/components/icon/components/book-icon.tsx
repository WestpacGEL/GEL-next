import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function BookIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Book',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 0C2.89543 0 2 0.89543 2 2V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V2C22 0.895431 21.1046 0 20 0H4ZM12 2H6V14L9 12L12 14V2Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2H20V22H4V2H6V14L9 12L12 14V2ZM2 2C2 0.89543 2.89543 0 4 0H20C21.1046 0 22 0.895431 22 2V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22V2Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

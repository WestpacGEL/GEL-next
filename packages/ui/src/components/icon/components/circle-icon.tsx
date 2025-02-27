import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CircleIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Circle',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24c6.628 0 12-5.373 12-12S18.628 0 12 0 0 5.373 0 12s5.372 12 12 12Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12c0 6.627-5.372 12-12 12S0 18.627 0 12 5.372 0 12 0s12 5.373 12 12ZM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

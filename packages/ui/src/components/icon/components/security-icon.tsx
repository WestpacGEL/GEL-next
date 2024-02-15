import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function SecurityIcon({ 'aria-label': ariaLabel = 'Security', copyrightYear = '2024', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 4.5L12 0L2 4.5V11C2 17.0545 6.26667 22.6255 12 24C17.7333 22.6255 22 17.0545 22 11V4.5ZM4 11C4 11.3353 4.01549 11.6689 4.04577 12H12V21.9311C16.2744 20.6812 19.5346 16.5867 19.9542 12H12V2.19317L4 5.79317V11Z"
        fill="currentColor"
      />
    </Icon>
  );
}

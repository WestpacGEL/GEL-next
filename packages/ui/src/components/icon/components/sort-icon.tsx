import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function SortIcon({ 'aria-label': ariaLabel = 'Sort', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M18.3643 14.6367L12 21.001L5.63574 14.6367L7.0498 13.2227L12 18.1729L16.9492 13.2227L18.3643 14.6367ZM18.3643 9.36426L16.9502 10.7783L12 5.82812L7.05078 10.7783L5.63672 9.36426L12 3L18.3643 9.36426Z"
        fill="currentColor"
      />
    </Icon>
  );
}

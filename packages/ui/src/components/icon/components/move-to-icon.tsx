import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function MoveToIcon({ 'aria-label': ariaLabel = 'Move To', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M20 0H4C2.9 0 2 0.9 2 2V6H4V2H20V22H4V18H2V22C2 23.1 2.9 24 4 24H20C21.11 24 22 23.1 22 22V2C22 0.9 21.11 0 20 0Z"
        fill="currentColor"
      />
      <path
        d="M5.29291 7.70712L8.58579 11H0V13H8.58582L5.29291 16.2929L6.70712 17.7071L12.4142 12L6.70712 6.29291L5.29291 7.70712Z"
        fill="currentColor"
      />
    </Icon>
  );
}

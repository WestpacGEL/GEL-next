import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CursorArrowIcon({
  'aria-label': ariaLabel = 'Cursor arrow',
  copyrightYear = '2021',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m6 1 12.67 11.823-5.701.169 3.801 8.741L13.856 23l-3.801-8.741L6 18.313z"
      />
    </Icon>
  );
}

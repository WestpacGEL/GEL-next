import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PhoneIcon({ 'aria-label': ariaLabel = 'Phone', copyrightYear = '2026', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M13 4C13.5523 4 14 4.44772 14 5C14 5.55228 13.5523 6 13 6H11C10.4477 6 10 5.55228 10 5C10 4.44772 10.4477 4 11 4H13Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 0C18.1046 0 19 0.895431 19 2V22C19 23.1046 18.1046 24 17 24H7C5.89543 24 5 23.1046 5 22V2C5 0.895431 5.89543 0 7 0H17ZM7 22H17V2H7V22Z"
        fill="currentColor"
      />
    </Icon>
  );
}

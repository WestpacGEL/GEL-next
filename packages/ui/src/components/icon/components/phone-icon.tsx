import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PhoneIcon({ 'aria-label': ariaLabel = 'Phone', copyrightYear = '2024', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2C5 0.89543 5.89543 0 7 0H17C18.1046 0 19 0.895431 19 2V22C19 23.1046 18.1046 24 17 24H7C5.89543 24 5 23.1046 5 22V2ZM17 19H7V3H17V19ZM10.5 21.5C10.5 22.33 11.17 23 12 23C12.83 23 13.5 22.33 13.5 21.5C13.5 20.67 12.83 20 12 20C11.17 20 10.5 20.67 10.5 21.5Z"
        fill="currentColor"
      />
    </Icon>
  );
}

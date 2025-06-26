import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function FormatColorIcon({
  'aria-label': ariaLabel = 'Format Color',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M22 24H2V20H22V24Z" fill="currentColor" />
      <path
        d="M19 12C19.1833 12.2 19.3587 12.4083 19.5254 12.625C19.692 12.8416 19.85 13.0501 20 13.25C20.25 13.6 20.4792 13.975 20.6875 14.375C20.8958 14.775 21 15.15 21 15.5C21 16.05 20.8038 16.5204 20.4121 16.9121C20.0204 17.3038 19.55 17.5 19 17.5C18.45 17.5 17.9796 17.3038 17.5879 16.9121C17.1962 16.5204 17 16.05 17 15.5C17 15.15 17.1042 14.775 17.3125 14.375C17.5208 13.975 17.75 13.6 18 13.25C18.15 13.0501 18.308 12.8416 18.4746 12.625C18.6413 12.4083 18.8167 12.2 19 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3145 8.58691C18.0952 9.36795 18.0953 10.6341 17.3145 11.415L12.3643 16.3652C11.5833 17.1458 10.3171 17.1459 9.53613 16.3652L4.58594 11.415C3.80519 10.6341 3.8053 9.36793 4.58594 8.58691L9.53613 3.63672L7.41504 1.51562L8.8291 0.101562L17.3145 8.58691ZM6 10L15.9004 10.001L10.9502 5.05078L6 10Z"
        fill="currentColor"
      />
    </Icon>
  );
}

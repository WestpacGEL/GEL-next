import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function WineGlassIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Wine Glass',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 8C20 12.0796 16.9463 15.446 13 15.9381V22H18V24H6V22H11V15.9381C7.05369 15.446 4 12.0796 4 8V0H20V8ZM18 7H6V2H18V7Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 8C20 12.0796 16.9463 15.446 13 15.9381V22H18V24H6V22H11V15.9381C7.05369 15.446 4 12.0796 4 8V0H20V8ZM17.917 9H6.08296C6.55904 11.8377 9.027 14 12 14C14.973 14 17.441 11.8377 17.917 9ZM18 7H6V2H18V7Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

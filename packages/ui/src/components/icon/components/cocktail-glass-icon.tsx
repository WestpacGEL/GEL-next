import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CocktailGlassIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Cocktail Glass',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 2L11 15.1818V22H6V24H18V22H13V15.1818L23 2H1ZM7.30349 7H16.6965L18.9724 4H5.02762L7.30349 7Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 2L11 15.1818V22H6V24H18V22H13V15.1818L23 2H1ZM8.82073 9L12 13.1909L15.1793 9H8.82073ZM7.30349 7H16.6965L18.9724 4H5.02762L7.30349 7Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

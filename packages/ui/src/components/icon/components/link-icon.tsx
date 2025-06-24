import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function LinkIcon({ 'aria-label': ariaLabel = 'Link', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M11 18H6C2.68629 18 0 15.3137 0 12C0 8.68629 2.68629 6 6 6H11V8H6C3.79086 8 2 9.79086 2 12C2 14.2091 3.79086 16 6 16H11V18Z"
        fill="currentColor"
      />
      <path
        d="M13 18H18C21.3137 18 24 15.3137 24 12C24 8.68629 21.3137 6 18 6H13V8H18C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16H13V18Z"
        fill="currentColor"
      />
      <path d="M16 11H8V13H16V11Z" fill="currentColor" />
    </Icon>
  );
}

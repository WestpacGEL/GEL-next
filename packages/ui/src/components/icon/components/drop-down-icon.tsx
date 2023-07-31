import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DropDownIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Drop Down',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path d="M5 8L12 16L19 8H5Z" fill="currentColor" />
      ) : (
        <path d="M5 8L12 16L19 8H5Z" fill="currentColor" />
      )}
    </Icon>
  );
}

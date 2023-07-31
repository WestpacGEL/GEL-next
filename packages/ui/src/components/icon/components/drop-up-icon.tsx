import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DropUpIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Drop Up',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path d="M19 16L12 8L5 16L19 16Z" fill="currentColor" />
      ) : (
        <path d="M19 16L12 8L5 16L19 16Z" fill="currentColor" />
      )}
    </Icon>
  );
}

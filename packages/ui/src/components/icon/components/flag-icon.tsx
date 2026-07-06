import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function FlagIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Flag',
  copyrightYear = '2026',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path d="M4 22V2H20L18 7L20 12H6V22H4Z" fill="currentColor" />
      ) : (
        <path d="M4 22V2H20L18 7L20 12H6V22H4ZM5.95 10H17L16 7L17.05 4H6L5.95 10Z" fill="currentColor" />
      )}
    </Icon>
  );
}

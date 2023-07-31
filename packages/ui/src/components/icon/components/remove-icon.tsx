import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function RemoveIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Remove',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path d="M4 11V13H20V11H4Z" fill="currentColor" />
      ) : (
        <path d="M4 11V13H20V11H4Z" fill="currentColor" />
      )}
    </Icon>
  );
}

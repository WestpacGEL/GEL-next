import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function RemoveIcon({ 'aria-label': ariaLabel = 'Remove', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M4 11V13H20V11H4Z" fill="currentColor" />
    </Icon>
  );
}

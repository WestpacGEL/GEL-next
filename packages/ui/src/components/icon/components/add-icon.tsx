import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function AddIcon({ 'aria-label': ariaLabel = 'Add', copyrightYear = '2024', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M11 11H4V13H11V20H13V13H20V11H13V4H11V11Z" fill="currentColor" />
    </Icon>
  );
}

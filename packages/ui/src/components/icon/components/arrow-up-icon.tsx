import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowUpIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Up',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M4 12L5.41 13.41L11 7.83L11 20H13V7.83L18.59 13.41L20 12L12 4L4 12Z" fill="currentColor" />
    </Icon>
  );
}

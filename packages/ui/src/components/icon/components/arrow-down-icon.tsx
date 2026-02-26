import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowDownIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Down',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M20 12L18.59 10.59L13 16.17V4L11 4L11 16.17L5.41 10.59L4 12L12 20L20 12Z" fill="currentColor" />
    </Icon>
  );
}

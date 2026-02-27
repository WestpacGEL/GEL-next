import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowBackIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Back',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M12 20L13.41 18.59L7.83 13L20 13V11L7.83 11L13.41 5.41L12 4L4 12L12 20Z" fill="currentColor" />
    </Icon>
  );
}

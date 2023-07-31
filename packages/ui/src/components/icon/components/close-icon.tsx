import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CloseIcon({ 'aria-label': ariaLabel = 'Close', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M5.41421 4L12 10.5858L18.5858 4L20 5.41421L13.4142 12L20 18.5858L18.5858 20L12 13.4142L5.41421 20L4 18.5858L10.5858 12L4 5.41421L5.41421 4Z"
        fill="currentColor"
      />
    </Icon>
  );
}

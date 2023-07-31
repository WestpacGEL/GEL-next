import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PlayIcon({ 'aria-label': ariaLabel = 'Play', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
    </Icon>
  );
}

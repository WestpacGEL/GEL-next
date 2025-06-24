import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PlayIcon({ 'aria-label': ariaLabel = 'Play', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M7 4V20L19 12L7 4Z" fill="currentColor" />
    </Icon>
  );
}

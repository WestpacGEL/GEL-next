import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowLeftIcon({ 'aria-label': ariaLabel = 'Arrow Left', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M9.82435 12L16.4121 18.5878L15 20L7 12L15 4L16.4122 5.41218L9.82435 12Z" fill="currentColor" />
    </Icon>
  );
}

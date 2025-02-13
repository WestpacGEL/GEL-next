import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DropLeftIcon({ 'aria-label': ariaLabel = 'Drop Left', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="m8 19 8-7-8-7v14Z" fill="currentColor" />
    </Icon>
  );
}

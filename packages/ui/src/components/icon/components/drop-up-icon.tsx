import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DropUpIcon({ 'aria-label': ariaLabel = 'Drop Up', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M19 16L12 8L5 16L19 16Z" fill="currentColor" />
    </Icon>
  );
}

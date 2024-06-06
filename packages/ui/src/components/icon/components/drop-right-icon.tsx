import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DropRightIcon({ 'aria-label': ariaLabel = 'Drop Right', copyrightYear = '2024', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="m16 5-8 7 8 7V5Z" fill="currentColor" />
    </Icon>
  );
}

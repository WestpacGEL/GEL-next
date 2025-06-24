import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DropDownIcon({ 'aria-label': ariaLabel = 'Drop Down', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M5 8L12 16L19 8H5Z" fill="currentColor" />
    </Icon>
  );
}

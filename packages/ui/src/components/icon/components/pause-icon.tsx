import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PauseIcon({ 'aria-label': ariaLabel = 'Pause', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 20H6V4H10V20ZM14 20V4H18V20H14Z" fill="currentColor" />
    </Icon>
  );
}

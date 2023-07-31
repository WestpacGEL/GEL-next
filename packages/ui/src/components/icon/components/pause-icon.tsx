import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PauseIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Pause',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path fillRule="evenodd" clipRule="evenodd" d="M10 19H6V5H10V19ZM14 19V5H18V19H14Z" fill="currentColor" />
      ) : (
        <path fillRule="evenodd" clipRule="evenodd" d="M10 19H6V5H10V19ZM14 19V5H18V19H14Z" fill="currentColor" />
      )}
    </Icon>
  );
}

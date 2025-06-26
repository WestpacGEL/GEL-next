import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function FullscreenExitIcon({
  'aria-label': ariaLabel = 'Fullscreen Exit',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M6 22H8V16H2V18H6V22ZM8 2H6V6H2V8H8V2ZM18 18H22V16H16V22H18V18ZM22 8V6H18V2H16V8H22Z"
        fill="currentColor"
      />
    </Icon>
  );
}

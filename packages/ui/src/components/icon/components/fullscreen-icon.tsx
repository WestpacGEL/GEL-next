import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function FullscreenIcon({
  'aria-label': ariaLabel = 'Fullscreen',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M4 16H2V22H8V20H4V16ZM2 8H4V4H8V2H2V8ZM20 20H16V22H22V16H20V20ZM16 2V4H20V8H22V2H16Z"
        fill="currentColor"
      />
    </Icon>
  );
}

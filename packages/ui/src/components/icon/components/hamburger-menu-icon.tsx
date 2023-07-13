import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function HamburgerMenuIcon({
  'aria-label': ariaLabel = 'Hamburger Menu',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2,7 L22,7 L22,5 L2,5 L2,7 Z M2,19 L2,17 L22,17 L22,19 L2,19 Z M2,13 L2,11 L22,11 L22,13 L2,13 Z"
      />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function HamburgerMenuIcon({
  'aria-label': ariaLabel = 'Hamburger Menu',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M2 7H22V5H2V7Z" fill="currentColor" />
      <path d="M2 19H22V17H2V19Z" fill="currentColor" />
      <path d="M22 13H2V11H22V13Z" fill="currentColor" />
    </Icon>
  );
}

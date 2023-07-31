import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExpandMoreIcon({
  'aria-label': ariaLabel = 'Expand More',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M12 13.5879L5.41218 7.00006L4 8.41223L12 16.4122L20 8.41218L18.5878 7L12 13.5879Z" fill="currentColor" />
    </Icon>
  );
}

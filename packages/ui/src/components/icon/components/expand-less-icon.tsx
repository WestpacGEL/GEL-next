import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExpandLessIcon({
  'aria-label': ariaLabel = 'Expand Less',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M12 9.82435L18.5878 16.4121L20 15L12 7L4 15L5.41218 16.4122L12 9.82435Z" fill="currentColor" />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExpandLessIcon({
  'aria-label': ariaLabel = 'Expand Less',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <polygon fill="currentColor" fillRule="evenodd" points="12 9.824 18.588 16.412 20 15 12 7 4 15 5.412 16.412" />
    </Icon>
  );
}

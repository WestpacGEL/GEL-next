import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExpandMoreIcon({
  'aria-label': ariaLabel = 'Expand More',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <polygon fill="currentColor" fillRule="evenodd" points="12 13.588 5.412 7 4 8.412 12 16.412 20 8.412 18.588 7" />
    </Icon>
  );
}

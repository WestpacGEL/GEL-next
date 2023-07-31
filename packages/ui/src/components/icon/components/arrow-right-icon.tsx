import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowRightIcon({
  'aria-label': ariaLabel = 'Arrow Right',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path d="M14.5879 12L8.00006 18.5878L9.41223 20L17.4122 12L9.41218 4L8 5.41218L14.5879 12Z" fill="currentColor" />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CursorArrowIcon({
  'aria-label': ariaLabel = 'Cursor Arrow',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M6 18.8885V1L20.3228 11.7571L13.6146 11.7459L18.0717 20.6976L14.491 22.4805L10.0339 13.5287L6 18.8885Z"
        fill="currentColor"
      />
    </Icon>
  );
}

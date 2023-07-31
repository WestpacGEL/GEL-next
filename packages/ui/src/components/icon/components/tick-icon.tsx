import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TickIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Tick',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path d="M8.6 15.6L4.4 11.4L3 12.8L8.6 18.4L20.6 6.4L19.2 5L8.6 15.6Z" fill="currentColor" />
      ) : (
        <path d="M8.6 15.6L4.4 11.4L3 12.8L8.6 18.4L20.6 6.4L19.2 5L8.6 15.6Z" fill="currentColor" />
      )}
    </Icon>
  );
}

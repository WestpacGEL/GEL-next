import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PinIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Pin',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path d="m18 12 2 2v2h-7v7l-1 1-1-1v-7H4v-2l2-2V2H5V0h14v2h-1v10Z" fill="currentColor" />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 12.828V2H8v10.828L6.828 14h10.344L16 12.828ZM6 2H5V0h14v2h-1v10l2 2v2h-7v7l-1 1-1-1v-7H4v-2l2-2V2Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

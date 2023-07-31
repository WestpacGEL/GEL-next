import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DragIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Drag',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path fillRule="evenodd" clipRule="evenodd" d="M4 9H20V11H4V9ZM20 15H4V13H20V15Z" fill="currentColor" />
      ) : (
        <path fillRule="evenodd" clipRule="evenodd" d="M4 9H20V11H4V9ZM20 15H4V13H20V15Z" fill="currentColor" />
      )}
    </Icon>
  );
}

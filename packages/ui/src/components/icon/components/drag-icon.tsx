import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DragIcon({ 'aria-label': ariaLabel = 'Drag', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4 9H20V11H4V9ZM20 15H4V13H20V15Z" fill="currentColor" />
    </Icon>
  );
}

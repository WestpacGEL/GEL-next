import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function LiveChatIcon({ 'aria-label': ariaLabel = 'Live Chat', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20,6 L23,6 C23.5522847,6 24,6.44771525 24,7 L24,24 L20,20 L7,20 C6.44771525,20 6,19.5522847 6,19 L6,16 L20,16 L20,6 Z M5,14 L0,20 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 L17,0 C17.5522847,-1.01453063e-16 18,0.44771525 18,1 L18,13 C18,13.5522847 17.5522847,14 17,14 L5,14 Z"
      />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExitIcon({ 'aria-label': ariaLabel = 'Exit', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M3.51677 4.50981C8.20277 -0.176183 15.8008 -0.176713 20.4873 4.50981L19.0731 5.92403C15.1679 2.01878 8.83623 2.01878 4.93098 5.92403C1.02573 9.82928 1.02573 16.1609 4.93098 20.0662C8.83623 23.9714 15.1679 23.9714 19.0731 20.0662L20.4873 21.4804C15.8013 26.1664 8.2033 26.1669 3.51677 21.4804C-1.16976 16.7938 -1.16922 9.19581 3.51677 4.50981Z"
        fill="currentColor"
      />
      <path
        d="M16.9117 17.2479L20.1525 14.0071H12L12.0391 12.0071L20.1562 12.0071L16.9118 8.76266L18.326 7.34844L24 13L18.326 18.6621L16.9117 17.2479Z"
        fill="currentColor"
      />
    </Icon>
  );
}

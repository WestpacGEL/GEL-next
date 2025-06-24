import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ExitIcon({ 'aria-label': ariaLabel = 'Exit', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M3.51677 3.50981C8.20277 -1.17618 15.8008 -1.17671 20.4873 3.50981L19.0731 4.92403C15.1679 1.01878 8.83623 1.01878 4.93098 4.92403C1.02573 8.82928 1.02573 15.1609 4.93098 19.0662C8.83624 22.9714 15.1679 22.9714 19.0731 19.0662L20.4873 20.4804C15.8013 25.1664 8.2033 25.1669 3.51677 20.4804C-1.16976 15.7938 -1.16922 8.19581 3.51677 3.50981Z"
        fill="currentColor"
      />
      <path
        d="M16.9117 16.2479L20.1525 13.0071H12L12.0391 11.0071L20.1562 11.0071L16.9118 7.76266L18.326 6.34844L24 12L18.326 17.6621L16.9117 16.2479Z"
        fill="currentColor"
      />
    </Icon>
  );
}

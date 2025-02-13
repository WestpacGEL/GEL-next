import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DesktopIcon({ 'aria-label': ariaLabel = 'Desktop', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 23.5L15.5 22L14.8333 20H22C23.1046 20 24 19.1046 24 18V2C24 0.89543 23.1046 0 22 0H2C0.89543 0 0 0.89543 0 2V18C0 19.1046 0.89543 20 2 20H9.16667L8.5 22L6 23.5V24H18V23.5ZM22 16H2V2H22V16Z"
        fill="currentColor"
      />
    </Icon>
  );
}

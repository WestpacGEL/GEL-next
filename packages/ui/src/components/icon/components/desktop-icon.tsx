import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DesktopIcon({ 'aria-label': ariaLabel = 'Desktop', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.5,22 L18,23.5 L18,24 L6,24 L6,23.5 L8.5,22 L9.16666667,20 L2,20 C0.8954305,20 1.3527075e-16,19.1045695 0,18 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 L22,0 C23.1045695,-2.02906125e-16 24,0.8954305 24,2 L24,18 C24,19.1045695 23.1045695,20 22,20 L14.8333333,20 L15.5,22 Z M2,16 L22,16 L22,2 L2,2 L2,16 Z"
      />
    </Icon>
  );
}

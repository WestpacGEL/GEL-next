import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function NewWindowIcon({ 'aria-label': ariaLabel = 'New Window', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M2 0H12V2H2V22H22V12H24V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2C0 0.89543 0.89543 0 2 0Z"
        fill="currentColor"
      />
      <path d="M22 8V3.41682L12.3998 13.017L10.9856 11.6028L20.5884 2H16V0H24V8H22Z" fill="currentColor" />
    </Icon>
  );
}

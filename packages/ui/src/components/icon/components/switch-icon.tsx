import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function SwitchIcon({ 'aria-label': ariaLabel = 'Switch', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5.985L8 0L14 5.985H10V14H6V5.985H2ZM14 18.015V10H18V18.015H22L16 24L10 18.015H14Z"
        fill="currentColor"
      />
    </Icon>
  );
}

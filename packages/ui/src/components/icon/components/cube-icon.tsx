import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CubeIcon({ 'aria-label': ariaLabel = 'Cube', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12,13 L24,7 L24,18 L12,24 L0,18 L0,7 L12,13 Z M12,0 L24,5 L12,11 L0,5 L12,0 Z"
      />
    </Icon>
  );
}

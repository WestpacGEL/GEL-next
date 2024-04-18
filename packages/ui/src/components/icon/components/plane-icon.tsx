import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PlaneIcon({ 'aria-label': ariaLabel = 'Plane', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M7 24V22.5L10 20V14L0 17V15L10 8V2C10 0.89543 10.8954 0 12 0C13.1046 0 14 0.89543 14 2V8L24 15V17L14 14V20L17 22.5V24L12 22.5L7 24Z"
        fill="currentColor"
      />
    </Icon>
  );
}

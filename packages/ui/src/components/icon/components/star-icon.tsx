import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const StarIcon = ({ 'aria-label': ariaLabel = 'Star', copyrightYear = '2020', ...props }: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon
      fill="currentColor"
      fillRule="evenodd"
      points="12 0 9 9 0 9 7.5 14.25 4.5 23.25 12 17.249 19.5 23.25 16.499 14.25 24 9 15 9"
    />
  </Icon>
);

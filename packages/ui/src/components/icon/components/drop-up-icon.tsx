import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const DropUpIcon = ({ 'aria-label': ariaLabel = 'Drop Up', copyrightYear = '2020', ...props }: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="5 8 12 16 19 8" transform="rotate(-180 12 12)" />
  </Icon>
);

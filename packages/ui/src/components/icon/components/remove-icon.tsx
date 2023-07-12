import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const RemoveIcon = ({ 'aria-label': ariaLabel = 'Remove', copyrightYear = '2020', ...props }: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="4 11 4 13 20 13 20 11" />
  </Icon>
);

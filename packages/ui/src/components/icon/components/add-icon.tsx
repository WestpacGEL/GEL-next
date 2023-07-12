import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const AddIcon = ({ 'aria-label': ariaLabel = 'Add', copyrightYear = '2020', ...props }: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon
      fill="currentColor"
      fillRule="evenodd"
      points="11 11 4 11 4 13 11 13 11 20 13 20 13 13 20 13 20 11 13 11 13 4 11 4"
    />
  </Icon>
);

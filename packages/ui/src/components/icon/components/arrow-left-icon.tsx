import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const ArrowLeftIcon = ({
  'aria-label': ariaLabel = 'Arrow Left',
  copyrightYear = '2020',
  ...props
}: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="9.824 12 16.412 18.588 15 20 7 12 15 4 16.412 5.412" />
  </Icon>
);

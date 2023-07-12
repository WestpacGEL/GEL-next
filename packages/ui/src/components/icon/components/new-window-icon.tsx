import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const NewWindowIcon = ({
  'aria-label': ariaLabel = 'New Window',
  copyrightYear = '2020',
  ...props
}: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12,0 L12,2 L2,2 L2,22 L22,22 L22,12 L24,12 L24,22 C24,23.1045695 23.1045695,24 22,24 L2,24 C0.8954305,24 0,23.1045695 0,22 L0,2 C-3.33066907e-16,0.8954305 0.8954305,0 2,0 L12,0 Z M22,3.41682007 L12.3997851,13.0170349 L10.9855716,11.6028214 L20.5883929,2 L16,2 L16,0 L24,0 L24,8 L22,8 L22,3.41682007 Z"
    />
  </Icon>
);

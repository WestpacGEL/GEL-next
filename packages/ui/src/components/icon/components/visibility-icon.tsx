import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const VisibilityIcon = ({
  'aria-label': ariaLabel = 'Visibility',
  copyrightYear = '2021',
  ...props
}: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 4C6.545 4 1.887 7.317 0 12c1.887 4.683 6.545 8 12 8s10.113-3.317 12-8c-1.887-4.683-6.545-8-12-8zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
    />
  </Icon>
);

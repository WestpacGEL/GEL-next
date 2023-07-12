import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const SdStorageIcon = ({
  'aria-label': ariaLabel = 'Sd Storage',
  copyrightYear = '2020',
  ...props
}: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18,0 C19.1,0 20,0.9 20,2 L20,22 C20,23.1 19.1,24 18,24 L4,24 C2.9,24 2,23.1 2,22 L2.02,6 L8,0 L18,0 Z M10,8 L10,2 L8,2 L8,8 L10,8 Z M14,8 L14,2 L12,2 L12,8 L14,8 Z M18,8 L18,2 L16,2 L16,8 L18,8 Z"
    />
  </Icon>
);

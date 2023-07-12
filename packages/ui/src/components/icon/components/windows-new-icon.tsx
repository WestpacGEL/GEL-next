import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const WindowsNewIcon = ({
  'aria-label': ariaLabel = 'Windows New',
  copyrightYear = '2020',
  ...props
}: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M23.9968,0 L11.2,1.8616 L11.2,11.1992 L23.9968,11.1992 L23.9968,0 Z M0,3.3984 L0.0088,11.1992 L9.6,11.1992 L9.6,2.0944 L0,3.3984 Z M11.2,12.7992 L11.2,22.2 L23.9968,24 L24,12.7992 L11.2,12.7992 Z M0.0072,12.7992 L0.008,20.6816 L9.6,21.996 L9.6,12.7992 L0.0072,12.7992 Z"
    />
  </Icon>
);

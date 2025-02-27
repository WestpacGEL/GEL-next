import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function WindowsNewIcon({
  'aria-label': ariaLabel = 'Windows New',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2 1.8616L23.9968 0V11.1992H11.2V1.8616ZM0.0088 11.1992L0 3.3984L9.6 2.0944V11.1992H0.0088ZM11.2 12.7992V22.2L23.9968 24L24 12.7992H11.2ZM0.008 20.6816L0.0072 12.7992H9.6V21.996L0.008 20.6816Z"
        fill="currentColor"
      />
    </Icon>
  );
}

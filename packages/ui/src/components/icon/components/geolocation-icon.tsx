import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function GeolocationIcon({
  'aria-label': ariaLabel = 'Geolocation',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <polygon fill="currentColor" fillRule="evenodd" points="0 12 11.143 12.857 12 24 24 0" />
    </Icon>
  );
}

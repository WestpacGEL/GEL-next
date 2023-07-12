import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const MapPinIcon = ({ 'aria-label': ariaLabel = 'Map Pin', copyrightYear = '2020', ...props }: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12,24 C6.66666667,16.278852 4,10.9455187 4,8 C4,3.581722 7.581722,0 12,0 C16.418278,0 20,3.581722 20,8 C20,10.9455187 17.3333333,16.278852 12,24 Z M12,14 C15.3137085,14 18,11.3137085 18,8 C18,4.6862915 15.3137085,2 12,2 C8.6862915,2 6,4.6862915 6,8 C6,11.3137085 8.6862915,14 12,14 Z"
    />
  </Icon>
);

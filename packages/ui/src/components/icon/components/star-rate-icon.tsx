import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function StarRateIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Star Rate',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          d="M12 0L9 9H0L7.5 14.25L4.5 23.25L12 17.2493L19.5 23.25L16.4993 14.25L24 9H15L12 0Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4415 11H6.34473L9.86915 13.4671L8.53924 17.4568L12 14.6879L15.46 17.4562L14.13 13.4671L17.6548 11H13.5585L12 6.32456L10.4415 11ZM9 9H0L7.5 14.25L4.5 23.25L12 17.2493L19.5 23.25L16.4993 14.25L24 9H15L12 0L9 9Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

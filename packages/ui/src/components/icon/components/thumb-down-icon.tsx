import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ThumbDownIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Thumb Down',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 4H16C17.1 4 18 4.9 18 6V16C18 16.55 17.78 17.05 17.42 17.41L10.83 24L9.77 22.95C9.5 22.68 9.33 22.3 9.33 21.89L9.36 21.57L10 16H4C2.5 16 2 15.5 2 14C2 13.5 2.05 12.5 2.14 12.27L5.16 5.22C5.46 4.5 6.17 4 7 4ZM20 16V4H24V16H20Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 16L9.36 21.57L9.33 21.89C9.33 22.1163 9.38178 22.3334 9.47358 22.528C9.52714 22.6415 9.59431 22.7473 9.67276 22.8428C9.70349 22.8801 9.73595 22.9159 9.77 22.95L10.83 24L17.42 17.41C17.78 17.05 18 16.55 18 16V6C18 4.9 17.1 4 16 4H7C6.17 4 5.46 4.5 5.16 5.22L2.14 12.27C2.05 12.5 2 13.5 2 14C2 15.5 2.5 16 4 16H10ZM4.05774 12.8724L7.00165 6H16V16L15.9999 16.0016L11.4954 20.5062L12.243 14H4C4 13.8005 4.01059 13.472 4.03142 13.1726C4.0399 13.0508 4.04904 12.9491 4.05774 12.8724Z"
            fill="currentColor"
          />
          <path d="M20 16V4H24V16H20Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

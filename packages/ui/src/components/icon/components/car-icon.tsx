import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CarIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Car',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.6889 3.13625L22 10V21C22 21.5523 21.5523 22 21 22H19C18.4477 22 18 21.5523 18 21V19H6V21C6 21.5523 5.55228 22 5 22H3C2.44772 22 2 21.5523 2 21V10L4.31111 3.13625C4.54444 2.4725 5.15556 2 5.88889 2H18.1111C18.8444 2 19.4667 2.4725 19.6889 3.13625ZM6.5 15C7.32843 15 8 14.3284 8 13.5C8 12.6716 7.32843 12 6.5 12C5.67157 12 5 12.6716 5 13.5C5 14.3284 5.67157 15 6.5 15ZM19 13.5C19 14.3284 18.3284 15 17.5 15C16.6716 15 16 14.3284 16 13.5C16 12.6716 16.6716 12 17.5 12C18.3284 12 19 12.6716 19 13.5ZM4.78376 8L6.13061 4H17.8694L19.2162 8H4.78376Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M8 13.5C8 14.3284 7.32843 15 6.5 15C5.67157 15 5 14.3284 5 13.5C5 12.6716 5.67157 12 6.5 12C7.32843 12 8 12.6716 8 13.5Z"
            fill="currentColor"
          />
          <path
            d="M17.5 15C18.3284 15 19 14.3284 19 13.5C19 12.6716 18.3284 12 17.5 12C16.6716 12 16 12.6716 16 13.5C16 14.3284 16.6716 15 17.5 15Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.6889 3.13625L22 10V21C22 21.5523 21.5523 22 21 22H19C18.4477 22 18 21.5523 18 21V19H6V21C6 21.5523 5.55228 22 5 22H3C2.44772 22 2 21.5523 2 21V10L4.31111 3.13625C4.54444 2.4725 5.15556 2 5.88889 2H18.1111C18.8444 2 19.4667 2.4725 19.6889 3.13625ZM4 10V17H20V10H4ZM4.78376 8L6.13061 4H17.8694L19.2162 8H4.78376Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

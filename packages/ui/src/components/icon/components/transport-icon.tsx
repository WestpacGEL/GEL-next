import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TransportIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Transport',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 22H8V23C8 23.5523 7.55228 24 7 24H5C4.44772 24 4 23.5523 4 23V22H3C2.44772 22 2 21.5523 2 21V2C2 0.89543 2.89543 0 4 0H20C21.1046 0 22 0.89543 22 2V21C22 21.5523 21.5523 22 21 22H20V23C20 23.5523 19.5523 24 19 24H17C16.4477 24 16 23.5523 16 23V22ZM9 17C9 18.1046 8.10457 19 7 19C5.89543 19 5 18.1046 5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17ZM17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19ZM4 4H20V12H4V4ZM15 2H9V3H15V2Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M9 17C9 18.1046 8.10457 19 7 19C5.89543 19 5 18.1046 5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17Z"
            fill="currentColor"
          />
          <path
            d="M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 22H8V23C8 23.5523 7.55228 24 7 24H5C4.44772 24 4 23.5523 4 23V22H3C2.44772 22 2 21.5523 2 21V2C2 0.89543 2.89543 0 4 0H20C21.1046 0 22 0.89543 22 2V21C22 21.5523 21.5523 22 21 22H20V23C20 23.5523 19.5523 24 19 24H17C16.4477 24 16 23.5523 16 23V22ZM4 4H20V12H4V4ZM15 2H9V3H15V2ZM4 14H20V20H4V14Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

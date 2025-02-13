import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TilesIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Tiles',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M4 2C2.89543 2 2 2.89543 2 4V9C2 10.1046 2.89543 11 4 11H9C10.1046 11 11 10.1046 11 9V4C11 2.89543 10.1046 2 9 2H4Z"
            fill="currentColor"
          />
          <path
            d="M4 13C2.89543 13 2 13.8954 2 15V20C2 21.1046 2.89543 22 4 22H9C10.1046 22 11 21.1046 11 20V15C11 13.8954 10.1046 13 9 13H4Z"
            fill="currentColor"
          />
          <path
            d="M13 4C13 2.89543 13.8954 2 15 2H20C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H15C13.8954 11 13 10.1046 13 9V4Z"
            fill="currentColor"
          />
          <path
            d="M15 13C13.8954 13 13 13.8954 13 15V20C13 21.1046 13.8954 22 15 22H20C21.1046 22 22 21.1046 22 20V15C22 13.8954 21.1046 13 20 13H15Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 20V15C11 13.8954 10.1046 13 9 13H4C2.89543 13 2 13.8954 2 15V20C2 21.1046 2.89543 22 4 22H9C10.1046 22 11 21.1046 11 20ZM4 4V9H9V4H4ZM4 15V20H9V15H4ZM20 4H15V9H20V4ZM15 15V20H20V15H15ZM2 4C2 2.89543 2.89543 2 4 2H9C10.1046 2 11 2.89543 11 4V9C11 10.1046 10.1046 11 9 11H4C2.89543 11 2 10.1046 2 9V4ZM13 4C13 2.89543 13.8954 2 15 2H20C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H15C13.8954 11 13 10.1046 13 9V4ZM13 15C13 13.8954 13.8954 13 15 13H20C21.1046 13 22 13.8954 22 15V20C22 21.1046 21.1046 22 20 22H15C13.8954 22 13 21.1046 13 20V15Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

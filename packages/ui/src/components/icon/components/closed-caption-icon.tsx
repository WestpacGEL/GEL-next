import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ClosedCaptionIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Closed Caption',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 4C0 2.89543 0.895431 2 2 2H22C23.1046 2 24 2.89543 24 4V20C24 21.1046 23.1046 22 22 22H2C0.895431 22 0 21.1046 0 20V4ZM5.5 14.5H9.5V13.5H11V15C11 15.55 10.55 16 10 16H5C4.45 16 4 15.55 4 15V9C4 8.45 4.45 8 5 8H10C10.55 8 11 8.45 11 9V10.5H9.5V9.5H5.5V14.5ZM14.5 14.5H18.5V13.5H20V15C20 15.55 19.55 16 19 16H14C13.45 16 13 15.55 13 15V9C13 8.45 13.45 8 14 8H19C19.55 8 20 8.45 20 9V10.5H18.5V9.5H14.5V14.5Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M5.5 14.5H9.5V13.5H11V15C11 15.55 10.55 16 10 16H5C4.45 16 4 15.55 4 15V9C4 8.45 4.45 8 5 8H10C10.55 8 11 8.45 11 9V10.5H9.5V9.5H5.5V14.5Z"
            fill="currentColor"
          />
          <path
            d="M18.5 14.5H14.5V9.5H18.5V10.5H20V9C20 8.45 19.55 8 19 8H14C13.45 8 13 8.45 13 9V15C13 15.55 13.45 16 14 16H19C19.55 16 20 15.55 20 15V13.5H18.5V14.5Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.895431 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM22 4H2V20H22V4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

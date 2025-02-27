import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function LuggageIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Luggage',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 4V2C8 0.895431 8.89543 0 10 0H14C15.1046 0 16 0.895431 16 2V4H20C21.1046 4 22 4.89543 22 6V20C22 21.1046 21.1046 22 20 22C20 23.1046 19.1046 24 18 24C16.8954 24 16 23.1046 16 22H8C8 23.1046 7.10457 24 6 24C4.89543 24 4 23.1046 4 22C2.89543 22 2 21.1046 2 20V6C2 4.89543 2.89543 4 4 4H8ZM10 2H14V4H10V2ZM7 18V8H9V18H7ZM11 8H13V18H11V8ZM17 18V8H15V18H17Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M7 18V8H9V18H7Z" fill="currentColor" />
          <path d="M13 8H11V18H13V8Z" fill="currentColor" />
          <path d="M15 18V8H17V18H15Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4V2C8 0.895431 8.89543 0 10 0H14C15.1046 0 16 0.895431 16 2V4H20C21.1046 4 22 4.89543 22 6V20C22 21.1046 21.1046 22 20 22C20 23.1046 19.1046 24 18 24C16.8954 24 16 23.1046 16 22H8C8 23.1046 7.10457 24 6 24C4.89543 24 4 23.1046 4 22C2.89543 22 2 21.1046 2 20V6C2 4.89543 2.89543 4 4 4H8ZM10 2H14V4H10V2ZM4 6V20H20V6H4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ThumbUpIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Thumb Up',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 20H8C6.9 20 6 19.1 6 18V8C6 7.45 6.22 6.95 6.58 6.59L13.17 0L14.23 1.05C14.5 1.32 14.67 1.7 14.67 2.11L14.64 2.43L14 8H20C21.5 8 22 8.5 22 10C22 10.5 21.95 11.5 21.86 11.73L18.84 18.78C18.54 19.5 17.83 20 17 20ZM4 8V20H0V8H4Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 8L14.64 2.43L14.67 2.11C14.67 1.88372 14.6182 1.66657 14.5264 1.47201C14.4729 1.35851 14.4057 1.2527 14.3272 1.15724C14.2965 1.11985 14.2641 1.08405 14.23 1.05L13.17 0L6.58 6.59C6.22 6.95 6 7.45 6 8V18C6 19.1 6.9 20 8 20H17C17.83 20 18.54 19.5 18.84 18.78L21.86 11.73C21.95 11.5 22 10.5 22 10C22 8.5 21.5 8 20 8H14ZM19.9423 11.1276L16.9984 18H8V8L8.00007 7.99836L12.5046 3.49382L11.757 10H20C20 10.1995 19.9894 10.528 19.9686 10.8274C19.9601 10.9492 19.951 11.0509 19.9423 11.1276Z"
            fill="currentColor"
          />
          <path d="M4 8V20H0V8H4Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

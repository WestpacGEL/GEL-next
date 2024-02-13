import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CakeIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Cake',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M14 4C14 5.1 13.11 6 12 6C10.9 6 10 5.1 10 4C10 3.62 10.1 3.27 10.29 2.97L12 0L13.71 2.97C13.9 3.27 14 3.62 14 4Z"
            fill="currentColor"
          />
          <path
            d="M11 7H13V9H18C20.2091 9 22 10.7909 22 13V15.9184C21.8687 16.0271 21.735 16.1318 21.5993 16.2305C20.9697 16.6884 20.4322 16.9142 20 16.9142C19.5678 16.9142 19.0303 16.6884 18.4007 16.2305C17.7867 15.784 17.2153 15.2153 16.7071 14.7071L16 14L15.2929 14.7071C14.7847 15.2153 14.2133 15.784 13.5993 16.2305C12.9697 16.6884 12.4322 16.9142 12 16.9142C11.5678 16.9142 11.0303 16.6884 10.4007 16.2305C9.78673 15.784 9.21526 15.2153 8.70711 14.7071L8 14L7.29289 14.7071C6.78474 15.2153 6.21327 15.784 5.59933 16.2305C4.96971 16.6884 4.4322 16.9142 4 16.9142C3.5678 16.9142 3.03029 16.6884 2.40067 16.2305C2.26496 16.1318 2.13133 16.0271 2 15.9184V13C2 10.7909 3.79086 9 6 9H11V7Z"
            fill="currentColor"
          />
          <path
            d="M20 18.9142C20.7273 18.9142 21.4057 18.671 22 18.3447V23C22 23.5523 21.5523 24 21 24H3C2.44772 24 2 23.5523 2 23V18.3447C2.59426 18.671 3.2727 18.9142 4 18.9142C5.0678 18.9142 6.03029 18.39 6.77567 17.8479C7.21857 17.5258 7.63353 17.1604 8 16.8143C8.36648 17.1604 8.78143 17.5258 9.22433 17.8479C9.96971 18.39 10.9322 18.9142 12 18.9142C13.0678 18.9142 14.0303 18.39 14.7757 17.8479C15.2186 17.5258 15.6335 17.1604 16 16.8143C16.3665 17.1604 16.7814 17.5258 17.2243 17.8479C17.9697 18.39 18.9322 18.9142 20 18.9142Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M14 4C14 5.1 13.11 6 12 6C10.9 6 10 5.1 10 4C10 3.62 10.1 3.27 10.29 2.97L12 0L13.71 2.97C13.9 3.27 14 3.62 14 4Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 7H13V9H18C20.2091 9 22 10.7909 22 13V23C22 23.5523 21.5523 24 21 24H3C2.44772 24 2 23.5523 2 23V13C2 10.7909 3.79086 9 6 9H11V7ZM6 11C4.89543 11 4 11.8954 4 13V16.9142C4.4322 16.9142 4.96971 16.6884 5.59933 16.2305C6.21327 15.784 6.78474 15.2153 7.29289 14.7071L8 14L8.70711 14.7071C9.21526 15.2153 9.78673 15.784 10.4007 16.2305C11.0303 16.6884 11.5678 16.9142 12 16.9142C12.4322 16.9142 12.9697 16.6884 13.5993 16.2305C14.2133 15.784 14.7847 15.2153 15.2929 14.7071L16 14L16.7071 14.7071C17.2153 15.2153 17.7867 15.784 18.4007 16.2305C19.0303 16.6884 19.5678 16.9142 20 16.9142V13C20 11.8954 19.1046 11 18 11H6ZM4 22V18.9142C5.0678 18.9142 6.03029 18.39 6.77567 17.8479C7.21857 17.5258 7.63353 17.1604 8 16.8143C8.36648 17.1604 8.78143 17.5258 9.22433 17.8479C9.96971 18.39 10.9322 18.9142 12 18.9142C13.0678 18.9142 14.0303 18.39 14.7757 17.8479C15.2186 17.5258 15.6335 17.1604 16 16.8143C16.3665 17.1604 16.7814 17.5258 17.2243 17.8479C17.9697 18.39 18.9322 18.9142 20 18.9142V22H4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function RssIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Rss',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2ZM20.0008 20C20.0008 11.1801 12.6224 4 4 4V7.068C11.0547 7.068 16.921 12.8701 16.921 20H20.0008ZM14.5632 19.9995H11.4827C11.4827 17.9952 10.7027 16.1093 9.29022 14.6975C7.87615 13.2827 6.35156 12.5028 4 12.5028V9.43555C9.48697 9.43555 14.5632 14.1739 14.5632 19.9995ZM6.12973 15.7334C7.30943 15.7334 8.26259 16.6913 8.26259 17.86C8.26259 19.0342 7.30943 19.9819 6.12973 19.9819C4.95473 19.9819 4 19.0342 4 17.86C4 16.6913 4.95473 15.7334 6.12973 15.7334Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M20.0008 20C20.0008 11.1801 12.6224 4 4 4V7.068C11.0547 7.068 16.921 12.8701 16.921 20H20.0008Z"
            fill="currentColor"
          />
          <path
            d="M14.5632 19.9995H11.4827C11.4827 17.9952 10.7027 16.1093 9.29022 14.6975C7.87615 13.2827 6.35156 12.5028 4 12.5028V9.43555C9.48697 9.43555 14.5632 14.1739 14.5632 19.9995Z"
            fill="currentColor"
          />
          <path
            d="M6.12973 15.7334C7.30943 15.7334 8.26259 16.6913 8.26259 17.86C8.26259 19.0342 7.30943 19.9819 6.12973 19.9819C4.95473 19.9819 4 19.0342 4 17.86C4 16.6913 4.95473 15.7334 6.12973 15.7334Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2ZM2 2H22V22H2V2Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function MapPinIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Map Pin',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 8C4 12.4183 12 24 12 24C12 24 20 12.4183 20 8C20 3.58172 16.4183 0 12 0C7.58172 0 4 3.58172 4 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.8022 22.2016C11.5231 23.3096 12 24 12 24C12 24 12.4769 23.3096 13.1978 22.2016C15.4296 18.7715 20 11.3395 20 8C20 3.58172 16.4183 0 12 0C7.58172 0 4 3.58172 4 8C4 11.3395 8.5704 18.7715 10.8022 22.2016ZM14.27 16.6533C13.4705 18.0315 12.6691 19.3227 12 20.3689C11.3309 19.3227 10.5295 18.0315 9.72999 16.6533C8.748 14.9605 7.78881 13.1704 7.08108 11.5595C6.33726 9.86647 6 8.65032 6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 8.65032 17.6627 9.86647 16.9189 11.5595C16.2112 13.1704 15.252 14.9605 14.27 16.6533Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

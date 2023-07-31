import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ReceiptIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Receipt',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 24V0H22V24L20.75 22.5L19.5 24L18.25 22.5L17 24L15.75 22.5L14.5 24L13.25 22.5L12 24L10.75 22.5L9.5 24L8.25 22.5L7 24L5.75 22.5L4.5 24L3.25 22.5L2 24ZM6 6V8H16V6H6ZM18 12H6V10H18V12ZM14 16H6V14H14V16Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M6 6V8H16V6H6Z" fill="currentColor" />
          <path d="M18 12H6V10H18V12Z" fill="currentColor" />
          <path d="M14 16H6V14H14V16Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 0V24L3.25 22.5L4.5 24L5.75 22.5L7 24L8.25 22.5L9.5 24L10.75 22.5L12 24L13.25 22.5L14.5 24L15.75 22.5L17 24L18.25 22.5L19.5 24L20.75 22.5L22 24V0H2ZM4 2H20V21H4V2Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

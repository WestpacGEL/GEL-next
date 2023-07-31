import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function SimCardIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Sim Card',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 0H8L2 7V22C2 23.1 2.9 24 4 24H18C19.1 24 20 23.1 20 22V2C20 0.9 19.1 0 18 0ZM8 14H6V8H8V14ZM10 20H12V12H10V20ZM12 10H10V8H12V10ZM14 20H16V14H14V20ZM8 20H6V16H8V20ZM14 12H16V8H14V12Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M8 14H6V8H8V14Z" fill="currentColor" />
          <path d="M10 20H12V12H10V20Z" fill="currentColor" />
          <path d="M12 10H10V8H12V10Z" fill="currentColor" />
          <path d="M14 20H16V14H14V20Z" fill="currentColor" />
          <path d="M8 20H6V16H8V20Z" fill="currentColor" />
          <path d="M14 12H16V8H14V12Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 7L8 0H18C19.1 0 20 0.9 20 2V22C20 23.1 19.1 24 18 24H4C2.9 24 2 23.1 2 22V7ZM8.91987 2L4 7.73985V22H18V2H8.91987Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

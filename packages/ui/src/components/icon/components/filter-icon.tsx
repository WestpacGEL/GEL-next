import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function FilterIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Filter',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path d="M4 8H2V6H4V8Z" fill="currentColor" />
          <path d="M2 12H4V10H2V12Z" fill="currentColor" />
          <path d="M2 16H4V14H2V16Z" fill="currentColor" />
          <path d="M6 12H22V10H6V12Z" fill="currentColor" />
          <path d="M22 16H6V14H22V16Z" fill="currentColor" />
          <path d="M6 6V8H22V6H6Z" fill="currentColor" />
          <path d="M19 21L16 18H22L19 21Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path d="M4 8H2V6H4V8Z" fill="currentColor" />
          <path d="M2 12H4V10H2V12Z" fill="currentColor" />
          <path d="M2 16H4V14H2V16Z" fill="currentColor" />
          <path d="M6 12H22V10H6V12Z" fill="currentColor" />
          <path d="M22 16H6V14H22V16Z" fill="currentColor" />
          <path d="M6 6V8H22V6H6Z" fill="currentColor" />
          <path d="M19 21L16 18H22L19 21Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

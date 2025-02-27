import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CubeIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Cube',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path d="M0 5L12 0L24 5L12 11L0 5Z" fill="currentColor" />
          <path d="M0 7L11 13V24L0 18V7Z" fill="currentColor" />
          <path d="M24 18L13 24L13 13L24 7V18Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 5L12 11L24 5L12 0L0 5ZM4.80298 5.16542L12 8.76393L19.197 5.16542L12 2.16667L4.80298 5.16542Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 7V17.5L12 24L0 17.5V7L12 13L24 7ZM11 14.7829L2 10.3579V16.3088L11 21.1838V14.7829ZM13 14.7829V21.1838L22 16.3088V10.3579L13 14.7829Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

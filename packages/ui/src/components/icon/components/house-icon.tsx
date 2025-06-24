import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function HouseIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'House',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12V11.0769L12 0L0 11.0769V12H2V24H22V12H24ZM15 22V15H9V22H15Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12V11.0769L12 0L0 11.0769V12H2V24H22V12H24ZM20 22V10.1064L12 2.72182L4 10.1064V22H8V15H16V22H20ZM14 22V17H10V22H14Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TransferIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Transfer',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16L0 8L8 0V4H12V12H8V16ZM12 12V20H16V24L24 16L16 8V12H12Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M8 0L0 8L8 16V13.1719L2.82837 8L6 4.82812V6H11V10H13V4H8V0Z" fill="currentColor" />
          <path d="M16 20V24L24 16L16 8V12H10V20H16Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

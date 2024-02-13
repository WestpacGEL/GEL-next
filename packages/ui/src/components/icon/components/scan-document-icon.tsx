import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ScanDocumentIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Scan Document',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 0C2.89543 0 2 0.89543 2 2V12H22V6L16 0H4ZM20 6L16 2V6H20Z"
            fill="currentColor"
          />
          <path d="M2 22V18H22V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22Z" fill="currentColor" />
          <path d="M24 16H0V14H24V16Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path d="M2 2C2 0.89543 2.89543 0 4 0H16L22 6V12H20V6H16V2H4V12H2V2Z" fill="currentColor" />
          <path d="M24 14V16H0V14H24Z" fill="currentColor" />
          <path
            d="M2 22V18H4V22H20V18H22V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CalculatorIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Calculator',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 0H20C21.1046 0 22 0.89543 22 2V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22V2C2 0.89543 2.89543 0 4 0ZM4 2H20V8H4V2ZM10 15H18V17H10V15ZM10 18H18V20H10V18Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path d="M10 15H18V17H10V15Z" fill="currentColor" />
          <path d="M10 18H18V20H10V18Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 0H4C2.89543 0 2 0.89543 2 2V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V2C22 0.89543 21.1046 0 20 0ZM20 2H4V8H20V2ZM4 22V10H20V22H4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

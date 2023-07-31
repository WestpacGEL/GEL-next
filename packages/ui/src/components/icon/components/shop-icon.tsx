import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ShopIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Shop',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path d="M4 0H20V2H4V0Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4L0 11.0007V14H2V24H22V14H24V11.0007L20 4H4ZM20 22V14H16V22H20ZM14 22V14H4V22H14Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path d="M4 0H20V2H4V0Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4L0 11.0007V14H2V24H22V14H24V11.0007L20 4H4ZM2 11.5318V12H22V11.5318L18.8393 6H5.16071L2 11.5318ZM20 22V14H16V22H20ZM14 22V14H4V22H14Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

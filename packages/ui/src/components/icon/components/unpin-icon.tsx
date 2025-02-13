import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function UnpinIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Unpin',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          d="M23.99 22.572 1.419-.001.003 1.413 6 7.41V12l-2 2v2h7v7l1 1 1-1v-7h1.59l7.986 7.986 1.415-1.414ZM20 14v1.753l-15-15V0h14v2h-1v10l2 2Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.99 22.572 1.419-.001.003 1.413 6 7.41V12l-2 2v2h7v7l1 1 1-1v-7h1.59l7.986 7.986 1.415-1.414ZM12.59 14H6.828L8 12.83v-3.42L12.59 14Z"
            fill="currentColor"
          />
          <path d="M16 2v10.092L19.908 16H20v-2l-2-2V2h1V0H5v1.092l3 3V2h8Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

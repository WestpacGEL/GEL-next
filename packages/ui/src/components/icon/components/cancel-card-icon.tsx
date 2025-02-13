import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function CancelCardIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Cancel Card',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            fillRule="evenodd"
            d="M1.416.002 0 1.416l.908.907A1.998 1.998 0 0 0 0 4v16a2 2 0 0 0 2 2h18.585l1.998 1.998 1.415-1.414-.908-.907L1.416.002ZM4.585 6H1v4h7.585l-4-4Z"
            clipRule="evenodd"
            fill="currentColor"
          />
          <path d="M23 10h-8.758L24 19.757V4a2 2 0 0 0-2-2H6.242l4 4H23v4Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            d="M1.416.002 0 1.416l.908.907A1.998 1.998 0 0 0 0 4v16a2 2 0 0 0 2 2h18.585l1.998 1.998 1.415-1.414-.908-.907L1.416.002ZM2.585 4H2v4h4.585l-4-4Zm8 8H2v8h16.585l-8-8Z"
            clipRule="evenodd"
            fill="currentColor"
          />
          <path d="M22 8h-9.758l4 4H22v5.757l2 2V4a2 2 0 0 0-2-2H6.242l2 2H22v4Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function NotificationIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Notification',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M20 11C20 7.27232 17.4505 4.14012 14 3.25203V2C14 0.89543 13.1046 0 12 0C10.8954 0 10 0.89543 10 2V3.25203C6.54955 4.14012 4 7.27232 4 11V17L2 19V20H22V19L20 17V11Z"
            fill="currentColor"
          />
          <path
            d="M12.0015 24C10.3438 24 9 22.6569 9 21H15.003C15.003 22.6569 13.6592 24 12.0015 24Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 3.25203C17.4505 4.14012 20 7.27232 20 11V17L22 19V20H2V19L4 17V11C4 7.27232 6.54955 4.14012 10 3.25203V2C10 0.89543 10.8954 0 12 0C13.1046 0 14 0.89543 14 2V3.25203ZM18 11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11V18H18V11Z"
            fill="currentColor"
          />
          <path
            d="M12.0015 24C10.3438 24 9 22.6569 9 21H15.003C15.003 22.6569 13.6592 24 12.0015 24Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

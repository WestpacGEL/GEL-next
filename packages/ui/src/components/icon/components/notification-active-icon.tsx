import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function NotificationActiveIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Notification Active',
  copyrightYear = '2025',
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
          <path
            d="M0.0410767 10C0.316289 6.66402 1.95605 3.71495 4.40092 1.71223L5.66744 3.2602C3.67085 4.8957 2.31859 7.28854 2.04938 10H0.0410767Z"
            fill="currentColor"
          />
          <path
            d="M19.5991 1.71223C22.044 3.71495 23.6837 6.66402 23.9589 10H21.9506C21.6814 7.28854 20.3292 4.8957 18.3326 3.2602L19.5991 1.71223Z"
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
          <path
            d="M0 9.99968C0.275213 6.6637 1.91497 3.71463 4.35985 1.71191L5.62636 3.25988C3.62977 4.89538 2.27751 7.28822 2.0083 9.99968H0Z"
            fill="currentColor"
          />
          <path
            d="M19.6402 1.71191C22.085 3.71463 23.7248 6.6637 24 9.99968H21.9917C21.7225 7.28822 20.3702 4.89538 18.3736 3.25988L19.6402 1.71191Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

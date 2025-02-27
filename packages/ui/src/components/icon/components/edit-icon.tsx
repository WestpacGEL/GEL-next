import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function EditIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Edit',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.6101 3.50951C24.13 4.02944 24.13 4.86932 23.6101 5.38925L21.1704 7.82891L16.1711 2.82961L18.6107 0.389946C19.1307 -0.129982 19.9706 -0.129982 20.4905 0.389946L23.6101 3.50951ZM0 24V19.0007L14.7446 4.25608L19.7439 9.25538L4.99931 24H0Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            d="M23.61 3.50951C24.13 4.02944 24.13 4.86932 23.61 5.38925L21.1704 7.82891L16.1711 2.82961L18.6107 0.389946C19.1307 -0.129982 19.9706 -0.129982 20.4905 0.389946L23.61 3.50951Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 19.0005V23.9998H4.99931L19.7439 9.25517L14.7446 4.25586L0 19.0005ZM16.9155 9.25517L4.17088 21.9998H2V19.8289L14.7446 7.08429L16.9155 9.25517Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

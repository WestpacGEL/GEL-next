import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function FutureClockIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Future Clock',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M20 16.5L24 12H21C21 6.20101 16.299 1.5 10.5 1.5C4.70101 1.5 0 6.20101 0 12C0 17.799 4.70101 22.5 10.5 22.5C13.0572 22.5 15.4009 21.5859 17.2221 20.0665L15.9417 18.53C14.4674 19.76 12.5701 20.5 10.5 20.5C5.80558 20.5 2 16.6944 2 12C2 7.30558 5.80558 3.5 10.5 3.5C15.1944 3.5 19 7.30558 19 12H16L20 16.5Z"
            fill="currentColor"
          />
          <path d="M15.2 15.2684L11.0012 12.8458V6H9V14L14.1994 17.0005L15.2 15.2684Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M20 16.5L24 12H21C21 6.20101 16.299 1.5 10.5 1.5C4.70101 1.5 0 6.20101 0 12C0 17.799 4.70101 22.5 10.5 22.5C13.0572 22.5 15.4009 21.5859 17.2221 20.0665L15.9417 18.53C14.4674 19.76 12.5701 20.5 10.5 20.5C5.80558 20.5 2 16.6944 2 12C2 7.30558 5.80558 3.5 10.5 3.5C15.1944 3.5 19 7.30558 19 12H16L20 16.5Z"
            fill="currentColor"
          />
          <path d="M15.2 15.2684L11.0012 12.8458V6H9V14L14.1994 17.0005L15.2 15.2684Z" fill="currentColor" />
        </Fragment>
      )}
    </Icon>
  );
}

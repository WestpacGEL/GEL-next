import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function EducationIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Education',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M0 8.5L12 2L24 8.5L12 16L2 9.75V17.5C2 18.0523 1.55228 18.5 1 18.5C0.447715 18.5 0 18.0523 0 17.5V8.5Z"
            fill="currentColor"
          />
          <path
            d="M4 13.3585L6.32484 14.8116L6.3324 14.8162L10.94 17.696C11.5885 18.1013 12.4115 18.1013 13.06 17.696L17.6677 14.8162L17.6753 14.8115L20 13.3585V16.9492L13.0677 21.3259C12.4155 21.7377 11.5845 21.7377 10.9323 21.3259L4 16.9494V13.3585Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 9.75L4 11V15.8468C4 16.5332 4.35195 17.1716 4.93232 17.538L10.9323 21.3259C11.5845 21.7377 12.4155 21.7377 13.0677 21.3259L19.0677 17.5378C19.6481 17.1714 20 16.533 20 15.8467V11L24 8.5L12 2L0 8.5V17.5C0 18.0523 0.447715 18.5 1 18.5C1.55228 18.5 2 18.0523 2 17.5V9.75ZM6 15.8468V12.25L12 16L18 12.25V15.8467L12 19.6348L6 15.8468ZM3.97119 8.6235L12 13.6415L20.0288 8.6235L12 4.27456L3.97119 8.6235Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

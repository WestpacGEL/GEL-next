import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function XIcon({ look = 'filled', 'aria-label': ariaLabel = 'X', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path fill="currentColor" d="M15.815 19.008h2.12L8.178 5.04h-2.12l9.757 13.968Z" />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm17.315 4-5.824 6.775L19.825 20h-4.659l-4.265-6.212L5.56 20H4.18l6.107-7.104L4.18 4H8.84l4.039 5.883L17.935 4h1.38Z"
            clipRule="evenodd"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m19.315 4-5.824 6.775L19.825 20h-4.659l-4.265-6.212L5.56 20H4.18l6.107-7.104L4.18 4H8.84l4.039 5.883L17.935 4h1.38Zm-3.5 15.008h2.12L8.178 5.04h-2.12l9.757 13.968Z"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm2 0h20v20H2V2Z"
            clipRule="evenodd"
          />
        </Fragment>
      )}
    </Icon>
  );
}

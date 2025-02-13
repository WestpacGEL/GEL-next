import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TwitterIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Twitter',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <g clipPath="url(#a)">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm16.115 7.342A6.453 6.453 0 0 0 20 6.816a6.732 6.732 0 0 1-1.638 1.729 10 10 0 0 1 .01.432c0 4.413-3.303 9.503-9.34 9.503A9.175 9.175 0 0 1 4 16.978a6.5 6.5 0 0 0 4.852-1.382c-1.436-.027-2.656-.992-3.075-2.32a3.074 3.074 0 0 0 1.432-.057c-1.5-.307-2.7-1.656-2.7-3.274v-.043c.625.251 1.017.401 1.554.419-.88-.599-1.392-1.622-1.392-2.78 0-.612.161-1.186.444-1.68 1.62 2.021 4.037 3.35 6.765 3.49a3.398 3.398 0 0 1-.085-.762c0-1.843 1.47-3.339 3.282-3.339.945 0 1.798.406 2.396 1.054a6.534 6.534 0 0 0 2.085-.81 3.348 3.348 0 0 1-1.443 1.848Z"
              clipRule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </Fragment>
      ) : (
        <Fragment>
          <g fill="currentColor" clipPath="url(#a)">
            <path d="M18.115 7.342A6.453 6.453 0 0 0 20 6.816a6.732 6.732 0 0 1-1.638 1.729 10 10 0 0 1 .01.432c0 4.413-3.303 9.503-9.34 9.503A9.175 9.175 0 0 1 4 16.978a6.5 6.5 0 0 0 4.852-1.382c-1.436-.027-2.656-.992-3.075-2.32a3.074 3.074 0 0 0 1.432-.057c-1.5-.307-2.7-1.656-2.7-3.274v-.043c.625.251 1.017.401 1.554.419-.88-.599-1.392-1.622-1.392-2.78 0-.612.161-1.186.444-1.68 1.62 2.021 4.037 3.35 6.765 3.49a3.398 3.398 0 0 1-.085-.762c0-1.843 1.47-3.339 3.282-3.339.945 0 1.798.406 2.396 1.054a6.534 6.534 0 0 0 2.085-.81 3.348 3.348 0 0 1-1.443 1.848Z" />
            <path
              fillRule="evenodd"
              d="M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm2 0h20v20H2V2Z"
              clipRule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </Fragment>
      )}
    </Icon>
  );
}

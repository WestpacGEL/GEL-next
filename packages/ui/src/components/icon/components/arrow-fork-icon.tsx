import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowForkIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Arrow Fork',
  copyrightYear = '2020',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M24.0003 2.00012L16 2L18.5859 4.58593L14.0859 9.08597L16.9143 11.9144L21.4143 7.41437L24.0002 10.0003L24.0003 2.00012Z"
            fill="currentColor"
          />
          <path
            d="M0.000245841 2.00025L8.00016 2.00021L5.41423 4.58607L13.9999 13.1718V24.0002H9.99991V14.8286L2.58576 7.41446L0 10.0002L0.000245841 2.00025Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M24.0003 2.00012L16 2L18.5859 4.58593L14.0859 9.08597L16.9143 11.9144L21.4143 7.41437L24.0002 10.0003L24.0003 2.00012Z"
            fill="currentColor"
          />
          <path
            d="M0.000245841 2.00025L8.00016 2.00021L5.41423 4.58607L13.9999 13.1718V24.0002H9.99991V14.8286L2.58576 7.41446L0 10.0002L0.000245841 2.00025Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

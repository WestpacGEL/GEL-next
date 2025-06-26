import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function InvestIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Invest',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.25 13.4994L21.731 3.731L24 6V0H18L20.3166 2.31663L12.2288 10.6497L5.63134 4.05229L0 9.68363V12.5121L5.63134 6.88071L12.25 13.4994ZM22 24H18V10H22V24ZM14 24H10V16H14V24ZM2 24H6V14H2V24Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.25 13.4994L21.731 3.731L24 6V0H18L20.3166 2.31663L12.2288 10.6497L5.63134 4.05229L0 9.68363V12.5121L5.63134 6.88071L12.25 13.4994ZM22 24H20V10H22V24ZM13 24H11V16H13V24ZM2 24H4V14H2V24Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

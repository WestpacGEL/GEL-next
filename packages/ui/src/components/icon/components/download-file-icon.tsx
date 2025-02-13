import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DownloadFileIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Download File',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 2C2 0.89543 2.89543 0 4 0H16L22 6V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22V2ZM16 2L20 6H16V2ZM10 10V14H7L12 20L17 14H14V10H10Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 2C2 0.89543 2.89543 0 4 0H16L22 6V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22V2ZM4 2H16V6H20V22H4V2ZM10 14V10H14V14H17L12 20L7 14H10Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

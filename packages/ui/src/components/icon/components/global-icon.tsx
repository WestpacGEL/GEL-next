import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function GlobalIcon({ 'aria-label': ariaLabel = 'Global', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM11 21.9506V19H10C8.89543 19 8 18.1046 8 17V15L2.35385 9.35385C2.12317 10.1967 2 11.084 2 12C2 17.1853 5.94668 21.4489 11 21.9506ZM15 2.4578C16.0927 2.80101 17.1047 3.32674 18 3.99927V7C18 7.55228 18.4477 8 19 8H21.1679C21.7031 9.22493 22 10.5778 22 12C22 14.7974 20.8514 17.3265 19 19.1414V19C19 17.8954 18.1046 17 17 17H15V13C15 12.4477 14.5523 12 14 12H8V10H10C10.5523 10 11 9.55229 11 9V6H13C14.1046 6 15 5.10457 15 4V2.4578Z"
        fill="currentColor"
      />
    </Icon>
  );
}

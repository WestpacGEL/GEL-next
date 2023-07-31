import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ListIcon({ 'aria-label': ariaLabel = 'List', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 9H4V7H2V9ZM4 13H2V11H4V13ZM4 17H2V15H4V17ZM22 13H6V11H22V13ZM6 17H22V15H6V17ZM6 9V7H22V9H6Z"
        fill="currentColor"
      />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowThreadReplyIcon({
  'aria-label': ariaLabel = 'Arrow Thread Reply',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M6 16V2H4V16C4 17.1046 4.89543 18 6 18L16.1677 18.0022L12.8748 21.2952L14.289 22.7094L19.9961 17.0023L14.289 11.2952L12.8748 12.7094L16.1676 16.0022L6 16Z"
        fill="currentColor"
      />
    </Icon>
  );
}

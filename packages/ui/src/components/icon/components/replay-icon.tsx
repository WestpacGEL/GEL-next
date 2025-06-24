import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ReplayIcon({ 'aria-label': ariaLabel = 'Replay', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M7.5 4L12 0V2.99999C17.5228 2.99999 22 7.47715 22 13C22 18.5228 17.5228 23 12 23C6.47716 23 2.00001 18.5228 2 13H4C4.00001 17.4183 7.58173 21 12 21C16.4183 21 20 17.4183 20 13C20 8.58171 16.4183 4.99999 12 4.99999V8L7.5 4Z"
        fill="currentColor"
      />
    </Icon>
  );
}

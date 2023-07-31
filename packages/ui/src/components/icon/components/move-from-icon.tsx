import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function MoveFromIcon({ 'aria-label': ariaLabel = 'Move From', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M20 0H4C2.9 0 2 0.9 2 2V22C2 23.1 2.9 24 4 24H20C21.11 24 22 23.1 22 22V16.2427L20 18.2427V22H4V2H20V5.75735L22 7.75735V2C22 0.9 21.11 0 20 0Z"
        fill="currentColor"
      />
      <path
        d="M16.2929 7.70712L19.5858 11H11V13H19.5858L16.2929 16.2929L17.7071 17.7071L23.4142 12L17.7071 6.29291L16.2929 7.70712Z"
        fill="currentColor"
      />
    </Icon>
  );
}

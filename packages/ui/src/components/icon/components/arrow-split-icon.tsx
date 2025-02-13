import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ArrowSplitIcon({
  'aria-label': ariaLabel = 'Arrow Split',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M8 2H0V10L2.58411 7.41589L10 14.8255V24H14V14.8255L21.4159 7.41589L24 10V2H16L18.5875 4.58747L12 11.1693L5.41253 4.58747L8 2Z"
        fill="currentColor"
      />
    </Icon>
  );
}

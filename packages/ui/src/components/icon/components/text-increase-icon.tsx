import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TextIncreaseIcon({
  'aria-label': ariaLabel = 'Text Increase',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 22H14L12.25 17H4.75L3 22H0L7 2H10L17 22ZM5.7998 14H11.2002L8.5 6.28516L5.7998 14Z"
        fill="currentColor"
      />
      <path d="M21 7H24V9H21V12H19V9H16V7H19V4H21V7Z" fill="currentColor" />
    </Icon>
  );
}

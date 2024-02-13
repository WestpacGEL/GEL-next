import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function NewContentIcon({
  'aria-label': ariaLabel = 'New Content',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M14 5C14 2.23857 16.2386 0 19 0C21.7614 0 24 2.23857 24 5C24 7.76143 21.7614 10 19 10C16.2386 10 14 7.76143 14 5Z"
        fill="currentColor"
      />
      <path
        d="M4 4H12.0709C12.1719 3.29385 12.3783 2.62171 12.6736 2H4C2.89543 2 2 2.89543 2 4V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V11.3264C21.3783 11.6217 20.7061 11.8281 20 11.9291V22H4V4Z"
        fill="currentColor"
      />
    </Icon>
  );
}

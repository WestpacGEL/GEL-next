import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TextLargeIcon({ 'aria-label': ariaLabel = 'Text Large', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="m8.315 13.157-.947 2.527L6 12.399 4.083 17h2.792l-.75 2H3.25L2 22H0l5-12h2l1.315 3.157Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 22h-3l-1.75-5h-7.5L10 22H7l7-20h3l7 20Zm-11.2-8h5.4l-2.7-7.715L12.8 14Z"
        fill="currentColor"
      />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function UploadIcon({ 'aria-label': ariaLabel = 'Upload', copyrightYear = '2021', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2a7 7 0 016.919 8.071A6 6 0 0118 22H7A7 7 0 015.036 8.28 7.002 7.002 0 0112 2zm0 7l-5 5h3v4h4v-4h3l-5-5z"
      />
    </Icon>
  );
}

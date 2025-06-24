import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ColorFiltersIcon({
  'aria-label': ariaLabel = 'Color Filters',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M8 4c.602 0 1.187.068 1.751.194A9.98 9.98 0 0 0 6 12a9.98 9.98 0 0 0 3.751 7.805A8 8 0 1 1 8 4ZM16 4a8 8 0 1 1-1.752 15.805A10.053 10.053 0 0 0 16 18a6 6 0 0 0 0-12 10.057 10.057 0 0 0-1.752-1.806A8.025 8.025 0 0 1 16 4Z"
        fill="currentColor"
      />
      <path
        d="M12 5.072A7.995 7.995 0 0 1 16 12c0 2.96-1.61 5.543-4 6.927A7.994 7.994 0 0 1 8 12c0-2.96 1.61-5.544 4-6.928Z"
        fill="currentColor"
      />
    </Icon>
  );
}

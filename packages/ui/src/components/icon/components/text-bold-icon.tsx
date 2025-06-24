import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function TextBoldIcon({ 'aria-label': ariaLabel = 'Text Bold', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.865 3c3.428 0 5.828 1.913 5.828 5.281 0 1.266-.673 2.551-1.561 3.336a5.081 5.081 0 0 1 2.368 4.296c0 2.758-2.199 4.999-4.945 5.087H5V3.002L11.865 3ZM8.47 13.485V17.4h4.874l.2-.01a1.958 1.958 0 0 0 0-3.895l-.2-.01H8.469ZM8.486 6.6v3.6h3.858l.184-.01a1.8 1.8 0 0 0 0-3.582l-.184-.008H8.486Z"
        fill="currentColor"
      />
    </Icon>
  );
}

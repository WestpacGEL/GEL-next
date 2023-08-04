import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function WBCLogoIcon({
  'aria-label': ariaLabel = 'Westpac',
  copyrightYear = '2023',
  viewBox = '0 0 180 65',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} viewBox={viewBox} {...props}>
      <path
        fill="#DA1710"
        d="M24.385 45.038s1.047 2.79 2.002 2.962H13.072c-2.481 0-4.668-1.39-5.366-4.03L1.643 22.941S.987 20.401 0 20.001h12.561c2.479 0 4.101.901 5.061 4.1l6.763 20.937zm20.227 0l6.767-20.937c.958-3.199 2.579-4.1 5.059-4.1H69c-.99.4-1.642 2.94-1.642 2.94l-6.065 21.03c-.7 2.638-2.886 4.03-5.364 4.03H42.613c.953-.174 1.998-2.963 1.998-2.963zM27 48V20h15v28H27z"
        fillRule="evenodd"
      />
    </Icon>
  );
}

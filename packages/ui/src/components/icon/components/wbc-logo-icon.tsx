import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function WBCLogoIcon({
  'aria-label': ariaLabel = 'Westpac',
  copyrightYear = '2023',
  viewBox = '0 0 69 28',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} viewBox={viewBox} {...props}>
      <path
        d="M24.385 25.038C24.385 25.038 25.432 27.828 26.387 28H13.072C10.591 28 8.404 26.61 7.706 23.97L1.643 2.941C1.643 2.941 0.987 0.400999 0 0.000999451H12.561C15.04 0.000999451 16.662 0.902 17.622 4.101L24.385 25.038ZM44.612 25.038L51.379 4.101C52.337 0.902 53.958 0.000999451 56.438 0.000999451H69C68.01 0.400999 67.358 2.941 67.358 2.941L61.293 23.971C60.593 26.609 58.407 28.001 55.929 28.001H42.613C43.566 27.827 44.612 25.038 44.612 25.038ZM27 28V0H42V28H27Z"
        fill="#DA1710"
      />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function RssIcon({ 'aria-label': ariaLabel = 'Rss', copyrightYear = '2020', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2,0 L22,0 L22,0 C23.1045695,-2.02906125e-16 24,0.8954305 24,2 L24,22 L24,22 C24,23.1045695 23.1045695,24 22,24 L2,24 L2,24 C0.8954305,24 1.3527075e-16,23.1045695 0,22 L0,2 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z M8.26259063,17.8600823 C8.26259063,19.0342936 7.30942583,19.9819714 6.12972761,19.9819714 C4.95473251,19.9819714 4,19.0342936 4,17.8600823 C4,16.691358 4.95473251,15.7334901 6.12972761,15.7334901 C7.30942583,15.7334901 8.26259063,16.691358 8.26259063,17.8600823 Z M11.4826573,20 C11.4826573,17.9956888 10.7027239,16.1097394 9.29022144,14.6980208 C7.87615128,13.2831668 6.35155791,12.5032334 4,12.5032334 L4,9.43601803 C9.48696845,9.43601803 14.5631981,14.1744072 14.5631981,20 L11.4826573,20 Z M16.9241623,20 L16.9210268,20 C16.9210268,12.8700764 11.0546737,7.06799922 4,7.06799922 L4,4 C12.622379,4 20.0007839,11.1800901 20.0007839,20 L16.9241623,20 Z"
      />
    </Icon>
  );
}

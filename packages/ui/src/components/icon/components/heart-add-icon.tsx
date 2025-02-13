import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function HeartAddIcon({ 'aria-label': ariaLabel = 'Heart Add', copyrightYear = '2025', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M10.7507 19.2364L10.7478 19.2338C7.87504 16.6312 5.6533 14.6125 4.12566 12.7465C2.62094 10.9085 2 9.46406 2 8.04451C2 5.76586 3.76486 4 6.05 4C7.35911 4 8.6463 4.61863 9.47788 5.59427L10.676 7H11.324L12.5221 5.59427C13.3537 4.61863 14.6409 4 15.95 4C17.8713 4 19.4247 5.24824 19.8708 7H21.9134C21.4304 4.12818 18.9807 2 15.95 2C14.7256 2 13.5328 2.36428 12.5183 2.99501C11.9468 3.35027 11.432 3.79006 11 4.29691C10.568 3.79006 10.0532 3.35027 9.48175 2.99501C8.46724 2.36428 7.27438 2 6.05 2C2.662 2 0 4.65958 0 8.04451C0 12.1953 3.73386 15.5781 9.39106 20.7034L9.405 20.716L11 22.1667L12.595 20.727L12.6384 20.6875C13.9763 19.4728 15.2063 18.3562 16.3041 17.3041L14.8895 15.8895C13.8262 16.9069 12.6125 18.0098 11.2529 19.2442L11.2506 19.2462L11.0051 19.4678L10.7507 19.2364Z"
        fill="currentColor"
      />
      <path d="M19 14V17H21V14H24V12H21V9H19V12H16V14H19Z" fill="currentColor" />
    </Icon>
  );
}

import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function HeartTickIcon({ 'aria-label': ariaLabel = 'Heart Tick', copyrightYear = '2023', ...props }: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        d="M10.7507 19.2364L10.7478 19.2338C7.87504 16.6312 5.6533 14.6125 4.12566 12.7465C2.62094 10.9085 2 9.46406 2 8.04451C2 5.76586 3.76486 4 6.05 4C7.35911 4 8.6463 4.61863 9.47788 5.59427L10.676 7H11.324L12.5221 5.59427C13.3537 4.61863 14.6409 4 15.95 4C17.8713 4 19.4247 5.24824 19.8708 7H21.9134C21.4304 4.12818 18.9807 2 15.95 2C14.7256 2 13.5328 2.36428 12.5183 2.99501C11.9468 3.35027 11.432 3.79006 11 4.29691C10.568 3.79006 10.0532 3.35027 9.48175 2.99501C8.46724 2.36428 7.27438 2 6.05 2C2.662 2 0 4.65958 0 8.04451C0 12.1953 3.73386 15.5781 9.39106 20.7034L9.405 20.716L11 22.1667L12.595 20.727L12.6384 20.6875C13.409 19.988 14.1439 19.3207 14.8382 18.6798L13.4227 17.2642C12.7468 17.8875 12.0233 18.5447 11.2529 19.2442L11.2506 19.2462L11.0051 19.4678L10.7507 19.2364Z"
        fill="currentColor"
      />
      <path
        d="M16.7021 14.4679L22.585 8.585L23.995 10.005L16.7021 17.2979L12.7021 13.2979L14.1121 11.8879L16.7021 14.4679Z"
        fill="currentColor"
      />
    </Icon>
  );
}

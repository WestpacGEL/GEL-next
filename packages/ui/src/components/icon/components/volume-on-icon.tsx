import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function VolumeOnIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Volume On',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path
            d="M14 21.7999C18.5645 20.8733 22 16.8378 22 11.9999C22 7.162 18.5645 3.12649 14 2.19995V4.25195C17.4505 5.14004 20 8.27224 20 11.9999C20 15.7276 17.4505 18.8598 14 19.7479V21.7999Z"
            fill="currentColor"
          />
          <path
            d="M14 16.5839C15.7659 15.8124 17 14.0503 17 12C17 9.94965 15.7659 8.18757 14 7.41602V16.5839Z"
            fill="currentColor"
          />
          <path d="M12 3L7 8H2V16H7L12 21V3Z" fill="currentColor" />
        </Fragment>
      ) : (
        <Fragment>
          <path
            d="M22 11.9999C22 16.8378 18.5645 20.8733 14 21.7999V19.7479C17.4505 18.8598 20 15.7276 20 11.9999C20 8.27224 17.4505 5.14004 14 4.25195V2.19995C18.5645 3.12649 22 7.162 22 11.9999Z"
            fill="currentColor"
          />
          <path
            d="M14 16.5839V7.41602C15.7659 8.18757 17 9.94965 17 12C17 14.0503 15.7659 15.8124 14 16.5839Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 16H2V8H7L12 3V21L7 16ZM4 14V10H7.82843L10 7.82843V16.1716L7.82843 14H4Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

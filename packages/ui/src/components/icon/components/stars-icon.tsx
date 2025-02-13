import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function StarsIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Stars',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          d="M11.901.41a.7.7 0 0 0-1.274 0L7.369 7.59.459 10.13a.7.7 0 0 0-.067 1.286l6.974 3.415 3.274 6.415a.7.7 0 0 0 1.247 0l3.275-6.415 6.974-3.415a.7.7 0 0 0-.067-1.286L15.16 7.59 11.901.41ZM19.558 15.33l-1.408 3.169-2.785 1.044a.1.1 0 0 0-.01.183l2.795 1.398 1.41 2.82a.1.1 0 0 0 .18 0l1.41-2.82 2.795-1.398a.1.1 0 0 0-.01-.183L21.15 18.5l-1.409-3.17a.1.1 0 0 0-.183 0Z"
          fill="currentColor"
        />
      ) : (
        <Fragment>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.901.41a.7.7 0 0 0-1.274 0L7.369 7.59.459 10.13a.7.7 0 0 0-.067 1.286l6.974 3.415 3.274 6.415a.7.7 0 0 0 1.247 0l3.275-6.415 6.974-3.415a.7.7 0 0 0-.067-1.286L15.16 7.59 11.901.41ZM4.005 10.958l4.84-1.778 2.419-5.333 2.42 5.333 4.84 1.778-4.84 2.37-2.42 4.74-2.42-4.74-4.84-2.37Z"
            fill="currentColor"
          />
          <path
            d="m19.558 15.33-1.408 3.169-2.785 1.044a.1.1 0 0 0-.01.183l2.795 1.398 1.41 2.82a.1.1 0 0 0 .18 0l1.41-2.82 2.795-1.398a.1.1 0 0 0-.01-.183L21.15 18.5l-1.409-3.17a.1.1 0 0 0-.183 0Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}

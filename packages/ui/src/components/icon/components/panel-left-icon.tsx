import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function PanelLeftIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Panel Left',
  copyrightYear = '2026',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <path
          d="M19.7778 2C20.3889 2 20.912 2.21759 21.3472 2.65278C21.7824 3.08796 22 3.61111 22 4.22222L22 19.7778C22 20.3889 21.7824 20.912 21.3472 21.3472C20.912 21.7824 20.3889 22 19.7778 22L4.22222 22C3.61111 22 3.08796 21.7824 2.65277 21.3472C2.21759 20.912 2 20.3889 2 19.7778L2 4.22222C2 3.61111 2.21759 3.08796 2.65278 2.65278C3.08796 2.21759 3.61111 2 4.22222 2L19.7778 2ZM10 4L10 20L20 20L20 4L10 4Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.7773 2C20.3885 2 20.9125 2.21716 21.3477 2.65234C21.7828 3.08753 22 3.61155 22 4.22266V19.7773C22 20.3885 21.7828 20.9125 21.3477 21.3477C20.9125 21.7828 20.3885 22 19.7773 22H4.22266C3.61155 22 3.08753 21.7828 2.65234 21.3477C2.21716 20.9125 2 20.3885 2 19.7773V4.22266C2 3.61155 2.21716 3.08753 2.65234 2.65234C3.08753 2.21716 3.61155 2 4.22266 2H19.7773ZM4 4V20H8V4H4ZM10 20H20V4H10V20Z"
          fill="currentColor"
        />
      )}
    </Icon>
  );
}

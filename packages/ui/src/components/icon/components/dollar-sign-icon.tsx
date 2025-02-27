import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function DollarSignIcon({
  'aria-label': ariaLabel = 'Dollar Sign',
  copyrightYear = '2025',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 15.3849H9.00516C9.14974 16.679 10.4303 17.5273 12.0826 17.5273C13.7453 17.5273 14.8812 16.6899 14.8812 15.5371C14.8812 14.5149 14.1687 13.9493 12.3718 13.5252L10.4303 13.0793C7.6833 12.4594 6.33046 10.9912 6.33046 8.69655C6.33046 6.17518 8.33485 4.38119 11 3.96618V2L13 2.01618V3.96618C15.7838 4.34531 17.6859 6.10482 17.7315 8.60955H14.809C14.7057 7.28276 13.6007 6.47799 12.0413 6.47799C10.5026 6.47799 9.46988 7.25014 9.46988 8.4138C9.46988 9.3817 10.1928 9.92547 11.9071 10.3387L13.7143 10.7411C16.6988 11.4154 18 12.7639 18 15.1565C18 17.8451 15.9725 19.6604 13 20.0487V22H11V20.0593C8.08944 19.7082 6.08249 18.0005 6 15.3849Z"
        fill="currentColor"
      />
    </Icon>
  );
}

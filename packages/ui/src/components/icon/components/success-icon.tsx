import React from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export const SuccessIcon = ({ 'aria-label': ariaLabel = 'Success', copyrightYear = '2020', ...props }: IconProps) => (
  <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12S0 18.627 0 12 5.372 0 12 0zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.064 4.137l1.4 1.399L8.6 18.4l-4.964-4.965 1.4-1.4L8.6 15.6l9.464-9.463z"
    />
  </Icon>
);

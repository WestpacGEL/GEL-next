import { ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ButtonProps } from '../button/index.js';

import { styles } from './button-dropdown.styles.js';

export type ButtonDropdownProps = {
  /**
   * Look for button
   */
  look?: 'primary' | 'hero' | 'faint';
  /**
   * State of whether the Popover is open
   */
  open?: boolean;
  /**
   * Soft look button
   */
  soft?: boolean;
  /**
   * Button text
   */
  text: string;
} & ButtonHTMLAttributes<Element> &
  Pick<ButtonProps, 'size' | 'iconBefore' | 'iconAfter' | 'block'> &
  VariantProps<typeof styles>;

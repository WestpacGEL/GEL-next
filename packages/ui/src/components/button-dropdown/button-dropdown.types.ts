import { ButtonHTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ButtonProps } from '../button/index.js';

import { styles } from './button-dropdown.styles.js';

type Variants = VariantProps<typeof styles>;

export type ButtonDropdownProps = {
  /**
   * ButtonDropdown body content
   */
  children?: ReactNode;
  /**
   * Size of the dropdown panel
   */
  dropdownSize?: Variants['dropdownSize'];
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
  /**
   * Uses portal to render popover
   */
  portal?: boolean | Element;
  /**
   * portal className
   */
  portalClassName?: string;
} & ButtonHTMLAttributes<Element> &
  Pick<ButtonProps, 'size' | 'iconBefore' | 'block'>;

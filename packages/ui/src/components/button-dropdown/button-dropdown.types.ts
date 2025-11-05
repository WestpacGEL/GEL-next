import { ButtonHTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ButtonProps } from '../button/index.js';
import { IconProps } from '../icon/icon.types.js';

import { styles } from './button-dropdown.styles.js';
import { ButtonDropdownPanelProps } from './components/button-dropdown-panel/button-dropdown-panel.types.js';

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
  look?: 'primary' | 'hero' | 'faint' | 'unstyled' | 'link';
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
  text?: ReactNode;
  /**
   * Dropdown icon
   */
  dropDownIcon?: (props: IconProps) => ReactNode;
} & ButtonHTMLAttributes<Element> &
  Pick<ButtonProps, 'size' | 'iconBefore' | 'block'> &
  Pick<ButtonDropdownPanelProps, 'shouldFlip'>;

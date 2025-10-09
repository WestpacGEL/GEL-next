import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Placement } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { ButtonProps } from '../button/index.js';

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
  dropdownSize?: ResponsiveVariants<Variants['dropdownSize']>;
  /**
   * Look for button
   */
  look?: ButtonProps['look'];
  /**
   * State of whether the Popover is open
   */
  open?: boolean;
  /**
   * Soft look button
   */
  soft?: ButtonProps['soft'];
  /**
   * Button text
   */
  text: string;
  /**
   * Uses portal to render popover
   */
  portalContainer?: Element;
  /**
   * portal className
   */
  portalClassName?: string;
  /**
   * placement of the popover
   */
  placement?: Placement;
} & ButtonHTMLAttributes<Element> &
  Pick<ButtonProps, 'size' | 'iconBefore' | 'block'> &
  Pick<ButtonDropdownPanelProps, 'shouldFlip'>;

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Placement } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';
import { ButtonProps } from '../button/index.js';
import { IconProps } from '../icon/icon.types.js';

import { DropdownPanelProps } from './components/dropdown-panel/dropdown-panel.types.js';
import { styles } from './dropdown.styles.js';

type Variants = VariantProps<typeof styles>;

export type DropdownProps = {
  /**
   * Dropdown body content
   */
  children?: ReactNode;
  /**
   * Size of the dropdown panel
   */
  dropdownSize?: ResponsiveVariants<Variants['dropdownSize']>;
  /**
   * State of whether the Popover is open
   */
  open?: boolean;
  /**
   * Soft look button
   */
  soft?: ButtonProps['soft'];
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
  /**
   * Look for button
   */
  look?: 'primary' | 'hero' | 'faint' | 'unstyled' | 'link';
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
  Pick<DropdownPanelProps, 'shouldFlip' | 'shouldCloseOnInteractOutside'>;

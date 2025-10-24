import { Property } from 'csstype';
import { HTMLAttributeAnchorTarget, HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { BrandKey } from '../../types/brand-types.js';

import { styles } from './header.styles.js';

type Variant = VariantProps<typeof styles>;

export type HeaderProps = {
  /**
   * Target for the logo link
   */
  anchorTarget?: HTMLAttributeAnchorTarget;
  /**
   * Icon for brand
   */
  brand: Exclude<BrandKey, 'btfg'>;
  /**
   * Removes anchor link from logo
   * @default false
   */
  disableLogoLink?: boolean;
  /**
   * Enable fixed header
   */
  fixed?: ResponsiveVariants<Variant['fixed']>;
  /**
   * Set max width for fixed header for certain layouts
   * NOTE: Using max-w in classname will work for non-fixed headers
   */
  fixedMaxWidth?: Property.MaxWidth;
  /**
   * Used with fixed to show drop shadow when something on screen is scrolled that should trigger drop shadow but doesn't
   */
  isScrolled?: boolean;
  /**
   * Visually hidden text for left button
   */
  leftAssistiveText?: string;
  /**
   * Icon type for left button either 'arrow' or 'hamburger'
   */
  leftIcon?: ResponsiveVariants<Variant['leftIcon']>;
  /**
   * On click handler for left button
   */
  leftOnClick?: () => void;
  /**
   * Aria-label for the logo
   */
  logoAssistiveText?: string;
  /**
   * Center logo at xs breakpoint
   */
  logoCenter?: ResponsiveVariants<Variant['logoCenter']>;
  /**
   * Link for logo, can be disabled with disableLogoLink
   * @default '#'
   */
  logoLink?: string;
  /**
   * On click handler for logo
   */
  logoOnClick?: () => void;
  /**
   * Text content for skip link
   */
  skipLinkContent?: string;
  /**
   * The id to the pages main content
   */
  skipToContentId?: string;
} & HTMLAttributes<Element>;

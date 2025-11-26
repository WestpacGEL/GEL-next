import { Property } from 'csstype';
import { HTMLAttributeAnchorTarget, HTMLAttributes } from 'react';

import { BrandKey } from '../../tailwind/index.js';

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
  fixed?: boolean;
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
   * Aria-label for the arrow/hamburger button
   * @default leftIcon === 'arrow' ? 'Back' : 'Menu'
   */
  leftAssistiveText?: string;
  /**
   * Icon type for left button either 'arrow' or 'hamburger'
   */
  leftIcon?: 'arrow' | 'hamburger';
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
  logoCenter?: boolean;
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

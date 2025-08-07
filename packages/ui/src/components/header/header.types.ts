import { HTMLAttributes } from 'react';

import { BrandKey } from '../../tailwind/index.js';

export type HeaderProps = {
  /**
   * Icon for brand
   */
  brand: Exclude<BrandKey, 'btfg'>;
  /**
   * Enable fixed header
   */
  fixed?: boolean;
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
   * Link for logo
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

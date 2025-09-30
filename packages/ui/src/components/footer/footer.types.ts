import { HTMLAttributes } from 'react';

import { BrandKey } from '../../types/brand-types.js';

export type FooterProps = {
  /**
   * Icon for brand
   */
  brand: Exclude<BrandKey, 'btfg'>;
  /**
   * Hide logo
   */
  hideLogo?: boolean;
  /**
   * Aria-label for the logo
   */
  logoAssistiveText?: string;
  /**
   * href for logo link
   */
  logoLink?: string;
  /**
   * Right offset for use with GEL sidebar component
   */
  offsetSidebar?: boolean;
  /**
   * Visually hidden text for logo link
   */
  srOnlyText?: string;
} & HTMLAttributes<Element>;

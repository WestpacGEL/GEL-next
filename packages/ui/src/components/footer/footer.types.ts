import { HTMLAttributes } from 'react';

import { BrandKey } from '../../tailwind/index.js';

export type FooterProps = {
  /**
   * Icon for brand
   */
  brand: BrandKey;
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

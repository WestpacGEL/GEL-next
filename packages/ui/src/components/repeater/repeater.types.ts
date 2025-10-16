import { HTMLAttributes } from 'react';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

export type RepeaterProps = {
  /**
   * on add callback
   */
  onAdd?: () => unknown;
  /**
   * Add text
   */
  addText?: string;
  /**
   * Enable separator version
   */
  separator?: ResponsiveVariants<boolean>;
} & HTMLAttributes<Element>;

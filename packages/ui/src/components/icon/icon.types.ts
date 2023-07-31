import { type ReactNode, type SVGAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './icon.styles.js';

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * Icon look variation. Defaults to filled
   */
  look?: 'filled' | 'outlined';
  /**
   * children prop
   */
  children?: ReactNode;

  /**
   * The icon SVG metadata copyright year text
   */
  copyrightYear?: string;
} & VariantProps<typeof styles>;

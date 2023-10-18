import { type ReactNode, type SVGAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './icon.styles.js';

type Variants = VariantProps<typeof styles>;

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * children prop
   */
  children?: ReactNode;
  /**
   * Icon color
   */
  color?: Variants['color'];
  /**
   * The icon SVG metadata copyright year text
   */
  copyrightYear?: string;

  /**
   * Icon look variation. Defaults to filled
   */
  look?: 'filled' | 'outlined';
  /**
   * Icon size
   */
  size?: Variants['size'];
};

import { type ReactNode, type SVGAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './icon.styles.js';
import type { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

type Variants = VariantProps<typeof styles>;

export type IconLook = 'filled' | 'outlined';

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * children prop
   */
  children?: ReactNode;
  /**
   * Icon color
   */
  color?: ResponsiveVariants<Variants['color']>;
  /**
   * The icon SVG metadata copyright year text
   */
  copyrightYear?: string;

  /**
   * Icon look variation. Defaults to filled
   */
  look?: IconLook;
  /**
   * Icon size
   */
  size?: ResponsiveVariants<Variants['size']>;
};

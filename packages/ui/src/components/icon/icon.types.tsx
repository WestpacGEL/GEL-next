import { type VariantProps } from 'class-variance-authority';
import { type ReactNode, type SVGAttributes } from 'react';

import { styles } from './icon.styles.js';

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * children prop
   */
  children?: ReactNode;

  /**
   * The icon SVG metadata copyright year text
   */
  copyrightYear?: string;
} & VariantProps<typeof styles>;

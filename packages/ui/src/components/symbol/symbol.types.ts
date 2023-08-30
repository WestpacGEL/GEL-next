import { type SVGAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './symbol.styles.js';

export type Align = 'left' | 'center' | 'right';

export type SymbolProps = Omit<SVGAttributes<SVGElement>, 'offset'> & {
  /**
   * SVG alignment
   */
  align?: Align;
  /**
   * Symbol copyright year
   */
  copyrightYear?: string;
  /**
   * Symbol offset alignment array i.e. [left, center, right]
   */
  offset?: Array<number | null>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * SVG viewBox height
   */
  viewBoxHeight?: number;
  /**
   * SVG viewBox width
   */
  viewBoxWidth?: number;
} & VariantProps<typeof styles>;

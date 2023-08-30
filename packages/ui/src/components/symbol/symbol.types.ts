import { type SVGAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './symbol.styles.js';

export type Align = 'left' | 'center' | 'right';

export type SymbolProps = Omit<SVGAttributes<SVGElement>, 'offset'> & {
  align?: Align;
  copyrightYear?: string;
  offset?: Array<number | null>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  viewBoxHeight?: number;
  viewBoxWidth?: number;
} & VariantProps<typeof styles>;

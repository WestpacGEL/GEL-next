import { type SVGAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './pictogram.styles.js';

export type PictogramProps = SVGAttributes<SVGElement> & {
  /**
   * SVG copyright year
   */
  copyrightYear?: string;
  /**
   * Pictogram mode
   */
  mode?: 'dark' | 'light' | 'duo';
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

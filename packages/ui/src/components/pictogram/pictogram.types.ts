import { type SVGAttributes } from 'react';

export type PictogramMode = 'base' | 'mono' | 'duo' | 'default' | 'inverse';

export type PictogramProps = SVGAttributes<SVGElement> & {
  /**
   * SVG copyright year
   */
  copyrightYear?: string;
  /**
   * Pictogram mode
   */
  mode?: PictogramMode;
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
};

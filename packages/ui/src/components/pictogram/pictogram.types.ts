import { type SVGAttributes } from 'react';

export type PictogramMode = 'dark' | 'light' | 'duo' | 'reversed';

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

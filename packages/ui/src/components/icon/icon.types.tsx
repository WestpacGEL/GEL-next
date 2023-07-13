import { type ReactNode, type SVGAttributes } from 'react';

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * children prop
   */
  children?: ReactNode;

  /**
   * The icon SVG metadata copyright year text
   */
  copyrightYear?: string;
};

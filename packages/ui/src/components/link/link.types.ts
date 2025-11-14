import { AnchorHTMLAttributes, ReactNode } from 'react';
import { AriaLinkOptions } from 'react-aria';

import { IconProps } from '../icon/index.js';

export type LinkProps = {
  /**
   * Link text or component
   */
  children?: ReactNode;
  /**
   * Classname for overriding base style
   */
  className?: string;
  /**
   * Places an icon within the button, after the button’s text
   */
  iconAfter?: (props: IconProps) => JSX.Element;
  /**
   * Places an icon within the button, before the button’s text
   */
  iconBefore?: (props: IconProps) => JSX.Element;
  /**
   * set size of icon
   * @default small
   */
  iconSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /**
   * Link type
   * @default standalone
   */
  type?: 'inline' | 'standalone';
  /**
   * Visually style the (inline) link with an underline
   * @default true
   */
  underline?: boolean;
  /**
   * Custom link component
   */
  linkComponent?: (props: any) => ReactNode;
} & Omit<AriaLinkOptions, 'isDisabled' | 'elementType'> &
  AnchorHTMLAttributes<Element>;

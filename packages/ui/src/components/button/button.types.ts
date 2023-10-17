import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { IconProps } from '../icon/index.js';

import { styles } from './button.styles.js';

type Variants = VariantProps<typeof styles>;

export type ButtonProps = {
  /**
   * Fit button width to its parent width.
   */
  block?: Variants['block'];
  /**
   * Places an icon within the button, after the button’s text
   */
  iconAfter?: (props: IconProps) => JSX.Element;
  /**
   * Places an icon within the button, before the button’s text
   */
  iconBefore?: (props: IconProps) => JSX.Element;
  /**
   * The color for the icon.
   *
   * Defaults to the current text color.
   */
  iconColor?: IconProps['color'];
  /**
   * Justify align button children
   */
  justify?: Variants['justify'];
  /**
   * Button look
   */
  look?: Variants['look'];
  /**
   * Size of the button
   */
  size?: Variants['size'];
  /**
   * Removes background colour and adjusts text colour.
   */
  soft?: Variants['soft'];
  /**
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & ButtonHTMLAttributes<Element> &
  AnchorHTMLAttributes<Element>;

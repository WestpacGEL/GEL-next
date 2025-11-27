import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { IconProps } from '../icon/index.js';

import { styles } from './button.styles.js';

type Variants = VariantProps<typeof styles>;

export type ButtonRef = HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement & HTMLDivElement;

export type ButtonProps = {
  /**
   * Fit button width to its parent width.
   * @default false
   */
  block?: Variants['block'];
  /**
   * Badge body content
   */
  children?: ReactNode;
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
   * The look of the icon
   * @default filled
   */
  iconLook?: IconProps['look'];
  /**
   * The size of the icon
   *
   * Defaults to system size depending on size of the button
   */
  iconSize?: IconProps['size'];
  /**
   * When true, children will use flex justify-between
   * @default false
   */
  justify?: Variants['justify'];
  /**
   * Button look
   * @default hero
   */
  look?: Variants['look'];
  /**
   * Removes horizontal padding from the 'link' look button
   * @default false
   */
  removeLinkPadding?: boolean;
  /**
   * Size of the button
   * @default medium
   */
  size?: Variants['size'];
  /**
   * Removes background colour and adjusts text colour.
   */
  soft?: Variants['soft'];
  /**
   * Tag to render
   * @default button
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & ButtonHTMLAttributes<Element> &
  AnchorHTMLAttributes<Element>;

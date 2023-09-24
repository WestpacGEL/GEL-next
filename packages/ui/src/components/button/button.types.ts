import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { IconProps } from '../icon/index.js';

import { styles } from './button.styles.js';

export type ButtonProps = {
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
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & ButtonHTMLAttributes<Element> &
  AnchorHTMLAttributes<Element> &
  VariantProps<typeof styles>;

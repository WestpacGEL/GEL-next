import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { IconProps } from '../icon/index.js';

import { styles } from './button.styles.js';

export type ButtonProps = {
  /**
   * Enable dropdown mode for button dropdown component
   */
  dropdown?: boolean;
  /**
   * Places an icon within the button, after the button’s text
   */
  iconAfter?: (props: IconProps) => JSX.Element;
  /**
   * Places an icon within the button, before the button’s text
   */
  iconBefore?: (props: IconProps) => JSX.Element;
  /**
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & ButtonHTMLAttributes<Element> &
  AnchorHTMLAttributes<Element> &
  VariantProps<typeof styles>;

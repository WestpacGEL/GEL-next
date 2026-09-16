import { ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';
import { IconProps } from '../icon/index.js';

import { styles } from './button.styles.js';

type Variants = VariantProps<typeof styles>;

export type BaseButtonProps = {
  /**
   * Fit button width to its parent width.
   * @default false
   */
  block?: ResponsiveVariants<Variants['block']>;
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
  justify?: ResponsiveVariants<Variants['justify']>;
  /**
   * Button look
   * @default hero
   */
  look?: ResponsiveVariants<Variants['look']>;
  /**
   * Removes horizontal padding from the 'link' look button
   * @default false
   */
  removeLinkPadding?: boolean;
  /**
   * Size of the button
   * @default medium
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Removes background colour and adjusts text colour.
   */
  soft?: ResponsiveVariants<Variants['soft']>;
};

export type ButtonRef<C extends React.ElementType = 'button'> = React.ComponentRef<C>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type ButtonProps<C extends React.ElementType = 'button'> = BaseButtonProps & {
  /**
   * Type to render
   * @default button
   */
  tag?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof BaseButtonProps | 'tag'>;

export type ButtonImplementationProps = BaseButtonProps & {
  className?: string;
  tag?: React.ElementType;
} & Record<string, unknown>;

export type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: PolymorphicRef<C> },
) => React.ReactElement | null;

import React, { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { IconProps } from '../icon/icon.types.js';

import { styles } from './alert.styles.js';

export type Variant = VariantProps<typeof styles>;

export type AlertProps = {
  /**
   * The alert content
   */
  children?: React.ReactNode;
  /**
   * Enable dismissible mode
   * @default false
   */
  dismissible?: boolean;
  /**
   * The alert heading
   */
  heading?: string;
  /**
   * The alert heading tag is automatically defined, but may be overridden via this prop if required for semantic reasons.
   * @default h2
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Alert icon.
   *
   * The alert icon is automatically rendered based on look. The icon can be overriden via this prop, for info look alerts only.
   */
  icon?: React.ElementType;
  /**
   * The size of the alert icon.
   * @default undefined
   */
  iconSize?: IconProps['size'];
  /**
   * Alert look style
   * @default info
   */
  look?: ResponsiveVariants<Variant['look']>;
  /**
   * Alert mode
   * @default box
   */
  mode?: ResponsiveVariants<Variant['mode']>;
  /**
   * onClose function for dismissible mode
   */
  onClose?: () => void;
  /**
   * Manually signal an open or close state of this alert
   */
  open?: boolean;
  /**
   * Tag to render
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

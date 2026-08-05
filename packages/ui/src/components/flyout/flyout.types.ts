import { Property } from 'csstype';
import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flyout.styles.js';

export type FlyoutProps = {
  /**
   * Flyout content
   */
  children?: ReactNode;
  /**
   * Assistive text for the close button
   * @default Close flyout
   */
  closeAssistiveText?: string;
  /**
   * The heading of the flyout
   */
  heading?: ReactNode;
  /**
   * The flyout heading tag may be overridden for semantic reasons
   * @default h2
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Callback when the close button is clicked
   */
  onClose: () => void;
  /**
   * Whether the flyout is open
   */
  open: boolean;
  /**
   * Side of the page from which the flyout opens
   * @default right
   */
  position?: 'left' | 'right';
  /**
   * Tag to render
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Width of the flyout
   */
  width: Property.Width;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;

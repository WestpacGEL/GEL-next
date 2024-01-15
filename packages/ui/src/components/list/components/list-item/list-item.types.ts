import { HTMLAttributeAnchorTarget, HTMLAttributes, ReactNode } from 'react';

import { IconProps } from '../../../icon/index.js';

export type ListItemProps = {
  /**
   * List.Item body content
   */
  children?: ReactNode;
  /**
   * Renders `<a>` link element around the item content
   */
  href?: string;
  /**
   * The icon for list item
   */
  icon?: (props: IconProps) => JSX.Element;
  /**
   * The look of the bullet, icon, tick and cross lists
   */
  look?: 'primary' | 'hero' | 'neutral' | 'success' | 'danger' | 'link';
  /**
   * The level of nesting
   */
  nested?: number;
  /**
   * The size of space between list elements
   */
  spacing?: 'medium' | 'large';
  /**
   * Renders `<a>` link element around the item content
   */
  target?: HTMLAttributeAnchorTarget;
  /**
   * The list style
   */
  type?: 'bullet' | 'link' | 'tick' | 'cross' | 'unstyled' | 'icon' | 'ordered';
} & HTMLAttributes<Element>;

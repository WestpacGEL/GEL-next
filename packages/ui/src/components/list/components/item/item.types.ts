import { HTMLAttributes } from 'react';

import { IconProps } from 'src/components/icon/index.js';

export type ItemProps = {
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
   * The list style
   */
  type?: 'bullet' | 'link' | 'tick' | 'cross' | 'unstyled' | 'icon' | 'ordered';
} & HTMLAttributes<Element>;

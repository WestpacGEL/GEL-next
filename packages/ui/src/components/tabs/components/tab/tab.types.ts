import { HTMLAttributes } from 'react';
import { Orientation } from 'react-aria';
import { Node, TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './tab.styles.js';

export type TabProps<T = any> = {
  /**
   * isDisabled flag
   */
  isDisabled?: boolean;
  /**
   * Item
   */
  item: Node<T>;
  /**
   * Orientation, vertical or horizontal for tab
   */
  orientation?: Orientation;
  /**
   * TabListState
   */
  state: TabListState<T>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;

import { HTMLAttributes } from 'react';
import { Orientation } from 'react-aria';
import { Node, TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './tab.styles.js';

type Variants = VariantProps<typeof styles>;

export type TabProps<T = any> = {
  /**
   * Color of tab
   */
  color?: Variants['color'];
  /**
   * isDisabled flag
   */
  isDisabled?: boolean;
  /**
   * Item
   */
  item: Node<T>;
  /**
   * Whether tab is justified
   */
  justify?: Variants['justify'];
  /**
   * Look of tab
   */
  look?: Variants['look'];
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
} & HTMLAttributes<Element>;

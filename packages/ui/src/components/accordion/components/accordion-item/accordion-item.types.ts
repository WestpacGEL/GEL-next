import { HTMLAttributes } from 'react';
import { Node, TreeState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion-item.styles.js';

export type AccordionItemProps<T = any> = {
  /**
   * Node from react-stately
   */
  item: Node<T>;
  /**
   * Tree state
   */
  state: TreeState<T>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;

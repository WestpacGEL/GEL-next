import { HTMLAttributes, ReactNode } from 'react';
import { Node, TreeState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion-item.styles.js';

type Variants = VariantProps<typeof styles>;

export type AccordionItemProps<T = HTMLElement> = {
  /**
   * AccordionItem body content
   */
  children?: ReactNode;
  /**
   * Node from react-stately
   */
  item: Node<T>;
  /**
   * Look of the item
   */
  look?: Variants['look'];
  /**
   * Tree state
   */
  state: TreeState<T>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

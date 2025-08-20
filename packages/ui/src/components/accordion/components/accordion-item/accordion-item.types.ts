import { HTMLAttributes, ReactNode } from 'react';
import { DisclosureProps } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion-item.styles.js';

type Variants = VariantProps<typeof styles>;

export type AccordionItemProps = {
  /**
   * AccordionItem body content
   */
  children?: ReactNode;
  /**
   * Whether specific item is disabled
   */
  isDisabled?: boolean;
  /**
   * Look of the item
   */
  look?: Variants['look'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Title for item
   */
  title?: ReactNode;
} & DisclosureProps &
  Omit<HTMLAttributes<HTMLElement>, 'title'>;

import { HTMLAttributes } from 'react';
import { DisclosureGroupProps } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion.styles.js';
import { AccordionItemProps } from './components/index.js';

type Variants = VariantProps<typeof styles>;
export type AccordionProps = {
  /**
   * Stretch the tab to fill the whole content
   * @default false
   */
  justify?: boolean;
  /**
   * The look of the accordion
   * @default soft
   */
  look?: AccordionItemProps['look'];
  /**
   * Whether the accordion is rounded
   * @default true
   */
  rounded?: Variants['rounded'];
} & Omit<DisclosureGroupProps, 'allowsMultipleExpanded'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

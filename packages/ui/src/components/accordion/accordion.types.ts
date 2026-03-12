import { HTMLAttributes } from 'react';
import { DisclosureGroupProps } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { styles } from './accordion.styles.js';
import { AccordionItemProps } from './components/index.js';

export type Variants = VariantProps<typeof styles>;
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
  look?: ResponsiveVariants<AccordionItemProps['look']>;
  /**
   * Whether the accordion is rounded
   * @default true
   */
  rounded?: ResponsiveVariants<Variants['rounded']>;
} & Omit<DisclosureGroupProps, 'allowsMultipleExpanded'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

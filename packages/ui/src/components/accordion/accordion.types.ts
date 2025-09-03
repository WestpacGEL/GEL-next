import { SpectrumAccordionProps } from '@react-types/accordion';
import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion.styles.js';
import { AccordionItemProps } from './components/index.js';
import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

type Variants = VariantProps<typeof styles>;
export type AccordionProps<T = HTMLElement> = SpectrumAccordionProps<T> & {
  /**
   * <AccordionItem /> as a collection
   */
  children?: SpectrumAccordionProps<T>['children'];
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
  rounded?: ResponsiveVariants<Variants['rounded']>;
} & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

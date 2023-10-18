import { SpectrumAccordionProps } from '@react-types/accordion';
import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion.styles.js';
import { AccordionItemProps } from './components/index.js';

type Variants = VariantProps<typeof styles>;
export type AccordionProps<T = any> = SpectrumAccordionProps<T> & {
  /**
   * Accordion colors
   */
  color?: AccordionItemProps['color'];
  /**
   * Stretch the tab to fill the whole content
   */
  justify?: boolean;
  /**
   * The look of the accordion
   */
  look?: Variants['look'];
  /**
   * Whether the accordion is rounded
   */
  rounded?: Variants['rounded'];
} & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

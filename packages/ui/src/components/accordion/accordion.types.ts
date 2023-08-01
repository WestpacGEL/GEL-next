import { SpectrumAccordionProps } from '@react-types/accordion';
import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './accordion.styles.js';
import { AccordionItemProps } from './components/index.js';

export type AccordionProps<T = any> = SpectrumAccordionProps<T> &
  VariantProps<typeof styles> & {
    /**
     * Accordion colors
     */
    color?: AccordionItemProps['color'];
    /**
     * Stretch the tab to fill the whole content
     */
    justify?: boolean;
  } & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

import { SpectrumTabsProps } from '@react-types/tabs';
import { HTMLAttributes, ReactElement } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { TabsTabProps } from './components/index.js';
import { styles } from './tabs.styles.js';

type Variants = VariantProps<typeof styles>;

export type TabsProps<T = object> = SpectrumTabsProps<T> & {
  /**
   * Children
   */
  children: ReactElement | ReactElement[];
  /**
   * Colors
   */
  color?: TabsTabProps['color'];
  /**
   * Stretch the tab to fill the whole content
   */
  justify?: boolean;
  /**
   * Look of tabs
   */
  look?: Variants['look'];
  /**
   * Orientation of tabs
   */
  orientation?: Variants['orientation'];
  /**
   * Sticky
   */
  sticky?: Variants['sticky'];
  /**
   * set the offset for the sticky tab
   */
  stickyOffset?: {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
  };
} & HTMLAttributes<HTMLDivElement>;

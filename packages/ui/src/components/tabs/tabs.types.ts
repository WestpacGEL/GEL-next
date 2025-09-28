import { SpectrumTabsProps } from '@react-types/tabs';
import { HTMLAttributes, ReactElement } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { TabsTabProps } from './components/index.js';
import { styles } from './tabs.styles.js';

type Variants = VariantProps<typeof styles>;

export type TabsProps<T = object> = Omit<SpectrumTabsProps<T>, 'orientation'> & {
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
  look?: ResponsiveVariants<Variants['look']>;
  /**
   * Orientation of tabs
   */
  orientation?: ResponsiveVariants<Variants['orientation']>;
  /**
   * Sticky
   */
  sticky?: ResponsiveVariants<Variants['sticky']>;
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

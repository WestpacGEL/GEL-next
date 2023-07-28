import { SpectrumTabsProps } from '@react-types/tabs';
import { ReactElement } from 'react';
import { Orientation } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './tabs.styles.js';

export type TabsProps<T = any> = {
  /**
   * Tag to render
   */
  children: ReactElement;
  /**
   * Orientation
   */
  orientation?: Orientation;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & SpectrumTabsProps<T> &
  VariantProps<typeof styles>;

import { HTMLAttributes, ReactNode } from 'react';
import { AriaTabPanelProps } from 'react-aria';
import { TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './tabs-tab-panel.styles.js';

type Variants = VariantProps<typeof styles>;

export type TabsTabPanelProps<T = object> = {
  /**
   * Table panel content
   */
  children?: ReactNode;
  /**
   * Look of tab panel
   */
  look?: Variants['look'];
  /**
   * Tab list state
   */
  state: TabListState<T>;
} & AriaTabPanelProps &
  HTMLAttributes<Element>;

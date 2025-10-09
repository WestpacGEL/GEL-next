import { HTMLAttributes, ReactNode } from 'react';
import { AriaTabPanelProps } from 'react-aria';
import { TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { TabsProps } from '../../tabs.types.js';

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
   * Keep tab panel mounted in DOM on change
   */
  keepMounted?: boolean;
  /**
   * Tab list state
   */
  state: TabListState<T>;
  /**
   * Stretch the tab to fill the whole content
   */
  justify?: boolean;
  /**
   * orientation of the tabs
   */
  orientation?: 'horizontal' | 'vertical';
} & AriaTabPanelProps &
  HTMLAttributes<Element>;

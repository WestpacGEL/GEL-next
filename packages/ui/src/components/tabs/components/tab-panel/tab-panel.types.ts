import { HTMLAttributes } from 'react';
import { AriaTabPanelProps } from 'react-aria';
import { TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './tab-panel.styles.js';

type Variants = VariantProps<typeof styles>;

export type TabPanelProps<T = any> = {
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

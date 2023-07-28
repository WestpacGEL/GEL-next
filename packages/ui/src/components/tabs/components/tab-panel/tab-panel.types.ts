import { HTMLAttributes } from 'react';
import { AriaTabPanelProps } from 'react-aria';
import { TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './tab-panel.styles.js';

export type TabPanelProps<T = any> = {
  /**
   * Tab list state
   */
  state: TabListState<T>;
} & AriaTabPanelProps &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;

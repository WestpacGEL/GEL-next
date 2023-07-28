import { HTMLAttributes } from 'react';
import { Orientation } from 'react-aria';
import { TabListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';
import { T } from 'vitest/dist/types-e3c9754d.js';

import { styles } from './tab.styles.js';

export type TabProps = {
  isDisabled?: boolean;
  item: Node;
  orientation?: Orientation;
  state: TabListState<T>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;

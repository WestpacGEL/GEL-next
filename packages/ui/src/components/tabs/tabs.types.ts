import { SpectrumTabsProps } from '@react-types/tabs';
import { HTMLAttributes, ReactElement } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { TabProps } from './components/index.js';
import { styles } from './tabs.styles.js';

export type TabsProps<T = any> = SpectrumTabsProps<T> &
  VariantProps<typeof styles> & {
    /**
     * Children
     */
    children: ReactElement | ReactElement[];
    /**
     * Colors
     */
    color?: TabProps['color'];
    /**
     * Stretch the tab to fill the whole content
     */
    justify?: boolean;
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

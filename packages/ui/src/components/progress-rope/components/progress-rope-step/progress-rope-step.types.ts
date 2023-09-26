import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ProgressRopeStepItem } from '../../progress-rope.types.js';

import { styles } from './progress-rope-step.styles.js';

export type ProgressRopeStepProps = {
  /**
   * Says it is current
   */
  current?: boolean;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Says it is visited
   */
  visited?: boolean;
} & Omit<ProgressRopeStepItem, 'text'> &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;

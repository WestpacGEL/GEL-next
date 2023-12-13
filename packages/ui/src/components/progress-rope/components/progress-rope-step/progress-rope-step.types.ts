import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ProgressRopeStepItem } from '../../progress-rope.types.js';

import { styles } from './progress-rope-step.styles.js';

type Variants = VariantProps<typeof styles>;

export type ProgressRopeStepProps = {
  /**
   * Says it is current
   */
  current?: boolean;
  /**
   * Whether step is first item
   */
  firstItem?: Variants['firstItem'];
  /**
   * Whether step is furthest visited
   */
  furthest?: boolean;
  /**
   * Whether step is last item in a group
   */
  lastItemInGroup?: Variants['lastItemInGroup'];
  /**
   * Whether step is last item in the rope e.g. Review and Submit
   */
  lastItemInRope?: Variants['lastItemInGroup'];
  /**
   * Whether previous step was part of group
   */
  previousStepGroup?: boolean;
  /**
   * Size of step
   */
  size?: Variants['size'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Says it is visited
   */
  visited?: boolean;
} & Omit<ProgressRopeStepItem, 'text'> &
  HTMLAttributes<Element>;

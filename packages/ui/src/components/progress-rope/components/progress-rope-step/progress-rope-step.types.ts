import { HTMLAttributes } from 'react';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { ProgressRopeStepItem } from '../../progress-rope.types.js';
import { type BaseRopeStepVariants } from '../base-rope-step/base-rope-step.types.js';

type Variants = BaseRopeStepVariants;

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
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Says it is visited
   */
  visited?: boolean;
} & Omit<ProgressRopeStepItem, 'type'> &
  Omit<HTMLAttributes<Element>, 'children'>;

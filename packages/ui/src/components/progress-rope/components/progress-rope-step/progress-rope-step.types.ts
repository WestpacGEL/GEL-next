import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { ProgressRopeStepItem } from '../../progress-rope.types.js';

import { styles } from './progress-rope-step.styles.js';

type Variants = VariantProps<typeof styles>;

export type RopeStepProps = {
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
  /**
   * Rope presentation variant used to resolve the step styling
   */
  variant?: Variants['variant'];
} & Omit<HTMLAttributes<Element>, 'children' | 'onClick'>;

export type UseRopeStepProps = Pick<
  RopeStepProps,
  | 'className'
  | 'current'
  | 'firstItem'
  | 'furthest'
  | 'lastItemInGroup'
  | 'lastItemInRope'
  | 'previousStepGroup'
  | 'size'
  | 'visited'
> & {
  /**
   * Rope presentation variant used to resolve the step styling
   */
  variant: NonNullable<RopeStepProps['variant']>;
};

export type BaseRopeStepProps = Pick<RopeStepProps, 'current' | 'furthest' | 'visited'> & {
  /**
   * Additional information associated with the step
   */
  subText?: ReactNode;
  /**
   * Resolved slot styles for the step
   */
  styles: ReturnType<typeof styles>;
  /**
   * Step text
   */
  text: ReactNode;
  /**
   * Rope presentation variant used to select the step layout
   */
  variant: 'progress' | 'status';
};

export type StatusRopeStepProps = RopeStepProps & {
  /**
   * Additional information associated with the step
   */
  subText: ReactNode;
  /**
   * Step text
   */
  text: ReactNode;
};

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

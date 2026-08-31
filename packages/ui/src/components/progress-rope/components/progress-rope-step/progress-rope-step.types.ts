import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { ProgressRopeStepItem } from '../../progress-rope.types.js';

import { styles } from './progress-rope-step.styles.js';

type Variants = VariantProps<typeof styles>;

export type RopeStepProps = {
  /**
   * Whether the step is currently active
   */
  current?: boolean;
  /**
   * Whether the step is the first item in its containing list
   */
  firstItem?: Variants['firstItem'];
  /**
   * Whether the step is the furthest one reached by the user
   */
  furthest?: boolean;
  /**
   * Whether the step is the last item in its group
   */
  lastItemInGroup?: Variants['lastItemInGroup'];
  /**
   * Whether the step is the final item in the rope
   */
  lastItemInRope?: Variants['lastItemInGroup'];
  /**
   * Whether the preceding top-level rope item is a group
   */
  previousStepGroup?: boolean;
  /**
   * Visual size of the step indicator
   * @default medium
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Whether the user has progressed beyond the step
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
   * Whether the step is currently active
   */
  current?: boolean;
  /**
   * Whether the step is the first item in its containing list
   */
  firstItem?: Variants['firstItem'];
  /**
   * Whether the step is the furthest one reached by the user
   */
  furthest?: boolean;
  /**
   * Whether the step is the last item in its group
   */
  lastItemInGroup?: Variants['lastItemInGroup'];
  /**
   * Whether the step is the final item in the rope
   */
  lastItemInRope?: Variants['lastItemInGroup'];
  /**
   * Whether the preceding top-level rope item is a group
   */
  previousStepGroup?: boolean;
  /**
   * Visual size of the step indicator
   * @default medium
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Whether the user has progressed beyond the step
   */
  visited?: boolean;
} & Omit<ProgressRopeStepItem, 'type'> &
  Omit<HTMLAttributes<Element>, 'children'>;

import { HTMLAttributes, ReactNode } from 'react';
import { type FocusRingAria } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { baseRopeStepStyles } from './base-rope-step.styles.js';

export type BaseRopeStepVariants = VariantProps<typeof baseRopeStepStyles>;

export type RopeStepProps = {
  /**
   * Says it is current
   */
  current?: boolean;
  /**
   * Whether step is first item
   */
  firstItem?: BaseRopeStepVariants['firstItem'];
  /**
   * Whether step is furthest visited
   */
  furthest?: boolean;
  /**
   * Whether step is last item in a group
   */
  lastItemInGroup?: BaseRopeStepVariants['lastItemInGroup'];
  /**
   * Whether step is last item in the rope e.g. Review and Submit
   */
  lastItemInRope?: BaseRopeStepVariants['lastItemInGroup'];
  /**
   * Whether previous step was part of group
   */
  previousStepGroup?: boolean;
  /**
   * Size of step
   */
  size?: ResponsiveVariants<BaseRopeStepVariants['size']>;
  /**
   * Says it is visited
   */
  visited?: boolean;
  /**
   * Rope presentation variant used to resolve the step styling
   */
  variant?: BaseRopeStepVariants['variant'];
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

export type UseRopeStepReturn = {
  /**
   * Props to apply to the focusable step element
   */
  focusProps: FocusRingAria['focusProps'];
  /**
   * Resolved rope step state
   */
  state: NonNullable<BaseRopeStepVariants['state']>;
  /**
   * Resolved slot styles for the step
   */
  styles: ReturnType<typeof baseRopeStepStyles>;
};

export type BaseRopeStepProps = Pick<RopeStepProps, 'current' | 'furthest' | 'visited'> & {
  /**
   * Additional information associated with the step
   */
  subText?: ReactNode;
  /**
   * Resolved slot styles for the step
   */
  styles: ReturnType<typeof baseRopeStepStyles>;
  /**
   * Step text
   */
  text: ReactNode;
  /**
   * Rope presentation variant used to select the step layout
   */
  variant: 'progress' | 'status';
};

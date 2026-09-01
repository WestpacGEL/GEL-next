import { ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { RopeStepItem } from '../../progress-rope.types.js';

import { styles } from './progress-rope-group-step.styles.js';

type Variants = VariantProps<typeof styles>;

type GroupStepRenderContext = {
  /**
   * Whether the step is currently active
   */
  current: boolean;
  /**
   * Whether the step is the first item in the group
   */
  firstItem: boolean;
  /**
   * Whether the step is the furthest one reached by the user
   */
  furthest: boolean;
  /**
   * Zero-based index of the furthest step reached by the user
   */
  furthestVisitedStep: number;
  /**
   * Whether the step is the last item in the group
   */
  lastItem: boolean;
  /**
   * Whether the step is the final item in the rope
   */
  lastItemInRope: boolean;
  /**
   * Tab index applied according to the group's expanded state
   */
  tabIndex?: number;
  /**
   * Whether the user has progressed beyond the step
   */
  visited: boolean;
};

export type ProgressRopeGroupStepProps<TStepItem extends RopeStepItem> = {
  /**
   * Children
   */
  children: ReactNode;
  /**
   * currentKey
   */
  currentKey?: number;
  /**
   * Boolean to tell if it is the first item of the rope
   */
  firstItem?: boolean;
  /**
   * Furtherst visited step
   */
  furthestVisitedStep?: number;
  /**
   * Whether or not it is the last item
   */
  lastItem?: boolean;
  /**
   * Trigger when the user try to open/close the group
   */
  onToggle?: () => unknown;
  /**
   * Boolean to tell if group is expanded
   */
  opened?: boolean;

  /**
   * Render function for each step
   */
  renderStep: (
    step: TStepItem & {
      /**
       * Zero-based position in the flattened step sequence
       */
      index: number;
    },
    context: GroupStepRenderContext,
  ) => ReactNode;
  /**
   * Steps to render
   */
  steps: (TStepItem & {
    /**
     * Zero-based position in the flattened step sequence
     */
    index: number;
  })[];
  /**
   * Tag for the heading wrapper
   */
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Rope presentation variant
   */
  variant: Variants['variant'];
};

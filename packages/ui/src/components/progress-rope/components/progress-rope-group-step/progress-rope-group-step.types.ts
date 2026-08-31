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
   * Content displayed as the group label
   */
  children: ReactNode;
  /**
   * Zero-based index of the currently active step
   */
  currentKey?: number;
  /**
   * Whether the group is the first item in the rope
   */
  firstItem?: boolean;
  /**
   * Zero-based index of the furthest step reached by the user
   */
  furthestVisitedStep?: number;
  /**
   * Whether the group is the last item in the rope
   */
  lastItem?: boolean;
  /**
   * Handler called when the user expands or collapses the group
   */
  onToggle?: () => unknown;
  /**
   * Whether the group's steps are expanded
   */
  opened?: boolean;
  /**
   * Renders each contained step and provides its resolved state
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
   * Indexed steps contained within the group
   */
  steps: (TStepItem & {
    /**
     * Zero-based position in the flattened step sequence
     */
    index: number;
  })[];
  /**
   * Semantic heading element used for the group label
   */
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Rope presentation variant used to resolve group styling
   */
  variant: Variants['variant'];
};

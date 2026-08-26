import { ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { RopeStepItem } from '../../progress-rope.types.js';

import { styles } from './progress-rope-group-step.styles.js';

type Variants = VariantProps<typeof styles>;

type GroupStepRenderContext = {
  current: boolean;
  firstItem: boolean;
  furthest: boolean;
  furthestVisitedStep: number;
  lastItem: boolean;
  lastItemInRope: boolean;
  tabIndex: number;
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
  renderStep: (step: TStepItem & { index: number }, context: GroupStepRenderContext) => ReactNode;
  /**
   * Steps to render
   */
  steps: (TStepItem & { index: number })[];
  /**
   * Tag for the heading wrapper
   */
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Rope presentation variant
   */
  variant: Variants['variant'];
};

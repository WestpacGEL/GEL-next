import { ReactNode } from 'react';

import { ProgressRopeStepItem } from '../../progress-rope.types.js';

export type ProgressRopeGroupStepProps = {
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
   * Steps to render
   */
  steps: (ProgressRopeStepItem & { index: number })[];
  /**
   * Tag for the heading wrapper
   */
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

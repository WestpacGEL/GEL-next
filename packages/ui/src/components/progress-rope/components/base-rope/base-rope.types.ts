import { ReactNode } from 'react';

export type RopeStepItem = {
  /**
   * Content displayed as the step label
   */
  text: ReactNode;
  /**
   * Identifies the item as an individual step
   */
  type?: 'step';
};

export type RopeStepGroup<TStepItem extends RopeStepItem> = {
  /**
   * Content displayed as the group label
   */
  text: ReactNode;
  /**
   * Identifies the item as a group of steps
   */
  type: 'group';
  /**
   * Steps contained within the group
   */
  steps: TStepItem[];
};

/**
 * Rope item with its zero-based position in the flattened step sequence
 */
export type RopeStepWithIndex<TStepItem extends RopeStepItem> =
  | (TStepItem & {
      /**
       * Zero-based position in the flattened step sequence
       */
      index: number;
    })
  | {
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
       * Content displayed as the group label
       */
      text: ReactNode;
      /**
       * Identifies the item as a group of steps
       */
      type: 'group';
    };

type StepRenderContext = {
  /**
   * Whether the step is currently active
   */
  current: boolean;
  /**
   * Whether the user has progressed beyond the step
   */
  visited: boolean;
  /**
   * Whether the step is the furthest one reached by the user
   */
  furthest: boolean;
  /**
   * Zero-based index of the furthest step reached by the user
   */
  furthestVisitedStep: number;
  /**
   * Whether the step is the first top-level rope item
   */
  firstItem: boolean;
  /**
   * Whether the step is the last top-level rope item
   */
  lastItem: boolean;
  /**
   * Whether the preceding top-level rope item is a group
   */
  previousStepGroup: boolean;
};

type GroupRenderContext = {
  /**
   * Whether the group contains the currently active step
   */
  current: boolean;
  /**
   * Whether the group contains a step reached by the user
   */
  visited: boolean;
  /**
   * Zero-based index of the furthest step reached by the user
   */
  furthestVisitedStep: number;
  /**
   * Whether the group's steps are expanded
   */
  opened: boolean;
  /**
   * Toggles the group's expanded state
   */
  toggle: () => void;
  /**
   * Whether the group is the first top-level rope item
   */
  firstItem: boolean;
  /**
   * Whether the group is the last top-level rope item
   */
  lastItem: boolean;
};

export type BaseRopeProps<TStepItem extends RopeStepItem> = {
  /**
   * Current active step (zero-indexed)
   * @default 0
   */
  current?: number;
  /**
   * Ordered steps and groups displayed by the rope
   */
  data?: (
    | TStepItem
    | {
        /**
         * Steps contained within the group
         */
        steps: TStepItem[];
        /**
         * Content displayed as the group label
         */
        text: ReactNode;
        /**
         * Identifies the item as a group of steps
         */
        type: 'group';
      }
  )[];
  /**
   * Determines whether opening a group closes other groups
   */
  groupToggleMode: 'multiple' | 'single';
  /**
   * Renders a group and provides its resolved state
   */
  renderGroup: (group: RopeStepGroup<TStepItem & { index: number }>, context: GroupRenderContext) => ReactNode;
  /**
   * Renders an individual step and provides its resolved state
   */
  renderStep: (step: TStepItem & { index: number }, context: StepRenderContext) => ReactNode;
};

export type OpenedGroupsAction =
  | { groupIndex: number; mode: 'multiple' | 'single'; type: 'toggle' }
  | { groupIndex: number | null; mode: 'multiple' | 'single'; type: 'sync' };

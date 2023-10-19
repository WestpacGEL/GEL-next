import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type ProgressRopeStepItem = {
  onClick?: MouseEventHandler<Element>;
  text: ReactNode;
  type?: 'step';
};

export type ProgressRopeStepWithIndex =
  | (ProgressRopeStepItem & { index: number })
  | {
      steps: (ProgressRopeStepItem & { index: number })[];
      text: ReactNode;
      type: 'group';
    };

export type ProgressRopeProps = {
  /**
   * Current active step (zero-indexed)
   */
  current?: number;
  /**
   * Data
   */
  data?: (
    | ProgressRopeStepItem
    | {
        steps: ProgressRopeStepItem[];
        text: ReactNode;
        type: 'group';
      }
  )[];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

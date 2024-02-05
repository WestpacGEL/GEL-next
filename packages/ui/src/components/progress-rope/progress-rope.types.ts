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
   * @default 0
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
   * The semantic tag for the group step headings
   * @default h3
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Tag to render
   * @default nav
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

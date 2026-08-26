import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type RopeStepItem = {
  text: ReactNode;
  type?: 'step';
};

export type RopeStepGroup<TStepItem extends RopeStepItem> = {
  text: ReactNode;
  type: 'group';
  steps: TStepItem[];
};

export type ProgressRopeStepItem = {
  onClick?: MouseEventHandler<Element>;
} & RopeStepItem;

export type StatusRopeStepItem = {
  subText: ReactNode;
} & RopeStepItem;

export type RopeStepWithIndex<TStepItem extends RopeStepItem> =
  | (TStepItem & { index: number })
  | {
      steps: (TStepItem & { index: number })[];
      text: ReactNode;
      type: 'group';
    };

type StepRenderContext = {
  current: boolean;
  visited: boolean;
  furthest: boolean;
  furthestVisitedStep: number;
  firstItem: boolean;
  lastItem: boolean;
  previousStepGroup: boolean;
};

type GroupRenderContext = {
  current: boolean;
  visited: boolean;
  furthestVisitedStep: number;
  opened: boolean;
  toggle: () => void;
  firstItem: boolean;
  lastItem: boolean;
};

export type BaseRopeProps<TStepItem extends RopeStepItem> = {
  /**
   * Current active step (zero-indexed)
   * @default 0
   */
  current?: number;
  /**
   * The semantic tag for the group step headings
   * @default h3
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  data?: (
    | TStepItem
    | {
        steps: TStepItem[];
        text: ReactNode;
        type: 'group';
      }
  )[];
  renderGroup: (group: RopeStepGroup<TStepItem & { index: number }>, context: GroupRenderContext) => ReactNode;
  renderStep: (step: TStepItem, context: StepRenderContext) => ReactNode;
};

export type StatusRopeProps = Omit<BaseRopeProps<StatusRopeStepItem>, 'renderGroup' | 'renderStep'> &
  Omit<HTMLAttributes<Element>, 'onClick'>;

export type ProgressRopeProps = {
  /**
   * Tag to render
   * @default nav
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element> &
  Omit<BaseRopeProps<ProgressRopeStepItem>, 'renderGroup' | 'renderStep'>;

export type ProgressRopeProps1 = {
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
    | StatusRopeStepItem
    | {
        steps: ProgressRopeStepItem[];
        text: ReactNode;
        type: 'group';
      }
    | {
        steps: StatusRopeStepItem[];
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

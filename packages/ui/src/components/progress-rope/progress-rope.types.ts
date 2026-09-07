import { HTMLAttributes, MouseEventHandler } from 'react';

import { type BaseRopeProps, type RopeStepItem } from './components/base-rope/base-rope.types.js';

export type ProgressRopeStepItem = {
  /**
   * Handler called when the user selects an available step
   */
  onClick?: MouseEventHandler<Element>;
} & RopeStepItem;

export type ProgressRopeProps = {
  /**
   * Tag to render
   * @default nav
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * The semantic tag for the group step headings
   * @default h3
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & HTMLAttributes<Element> &
  Omit<BaseRopeProps<ProgressRopeStepItem>, 'groupToggleMode' | 'renderGroup' | 'renderStep'>;

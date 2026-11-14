import { HTMLAttributes, ReactNode } from 'react';

import { type BaseRopeProps, type RopeStepItem } from './components/base-rope/base-rope.types.js';

export type StatusRopeStepItem = {
  /**
   * Additional information displayed beneath the step label
   */
  description: ReactNode;
} & RopeStepItem;

export type StatusRopeProps = {
  /**
   * The semantic tag for the group step headings
   * @default h3
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & Omit<BaseRopeProps<StatusRopeStepItem>, 'groupToggleMode' | 'renderGroup' | 'renderStep'> &
  Omit<HTMLAttributes<Element>, 'onClick'>;

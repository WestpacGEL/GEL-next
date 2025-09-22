import { type ReactNode } from 'react';

import { type IconProps } from '../icon/index.js';
import { InputProps } from '../index.js';

export type Composition = Record<'before' | 'after', string | null>;

export type Sizes = 'small' | 'medium' | 'large' | 'xlarge';

export type InputGroupContextType = {
  ariaDescribedByValue: string;
  id: string;
  size: Sizes;
};

export type InputGroupProps = {
  /**
   * After element
   */
  after?: ReactNode | { element?: ReactNode; icon?: (props: Omit<IconProps, 'icon'>) => JSX.Element; inset?: boolean };
  /**
   * Before element
   */
  before?: ReactNode | { element?: ReactNode; icon?: (props: Omit<IconProps, 'icon'>) => JSX.Element; inset?: boolean };
  /**
   * Children
   */
  children?: ReactNode;
  /**
   * className
   */
  className?: string;
  /**
   * Error message text
   */
  errorMessage?: string | string[];
  /**
   * Visually hide label
   */
  hideLabel?: boolean;
  /**
   * Hint text
   */
  hint?: ReactNode;
  /**
   * Define an id for internal elements
   */
  instanceId?: string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Size for Before/After/Input child components
   */
  size?: Sizes;
  /**
   * Supporting text
   */
  supportingText?: ReactNode;
  /**
   * Tag to render
   * @default div
   */
  // TODO: maybe we could limit the tags to be only fieldset or div?
  tag?: keyof JSX.IntrinsicElements;
  /**
   * width of input
   */
  width?: InputProps['width'];
  /**
   * id
   */
  id?: string;
  /**
   * aria-labelledby
   */
  'aria-labelledby'?: string;
  /**
   * aria-describedby
   */
  'aria-describedby'?: string;
  /**
   * aria-label
   */
  'aria-label'?: string;
};

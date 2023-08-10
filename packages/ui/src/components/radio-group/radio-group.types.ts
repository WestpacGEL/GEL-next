import { ReactNode } from 'react';
import { type AriaRadioGroupProps } from 'react-aria';
import { type RadioGroupState } from 'react-stately';

export type RadioGroupProps = {
  /**
   * The `Radio` components to render
   */
  children: ReactNode[];
  /**
   * String to override base style
   */
  className?: string;
  /**
   * Amount of Radios to display, remainder will be hidden behind reveal button
   */
  showAmount?: number;
  /**
   * Controls size of `Radio` components, can't be applied directly to `Radio`
   */
  size?: 'medium' | 'large';
} & Omit<AriaRadioGroupProps, 'errorMessage' | 'description'>;

export type RadioGroupContextState = {
  /**
   * Controls orientation of `Radio` components, can't be applied directly on `Radio`
   */
  orientation: 'vertical' | 'horizontal';
  /**
   * Controls size of `Radio` components, can't be applied directly on `Radio`
   */
  size: 'medium' | 'large';
} & RadioGroupState;

import { type AriaRadioGroupProps } from 'react-aria';
import { type RadioGroupState } from 'react-stately';

import { HintProps } from '../index.js';

import { RadioGroupRadioProps } from './components/radio-group-radio/radio-group-radio.types.js';

export type RadioGroupProps = {
  /**
   * String to override base style
   */
  className?: string;
  /**
   * error message
   */
  errorMessage?: string | string[];
  /**
   * hint message
   */
  hintMessage?: HintProps['children'];
  /**
   * The `Radio` components to render
   */
  radios: RadioGroupRadioProps[];
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

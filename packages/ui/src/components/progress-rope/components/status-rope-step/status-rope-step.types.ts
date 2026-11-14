import { ReactNode } from 'react';

import { RopeStepProps } from '../base-rope-step/base-rope-step.types.js';

export type StatusRopeStepProps = RopeStepProps & {
  /**
   * Additional information associated with the step
   */
  subText: ReactNode;
  /**
   * Step text
   */
  text: ReactNode;
};

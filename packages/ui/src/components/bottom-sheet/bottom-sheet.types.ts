import { ReactNode } from 'react';
import { OverlayTriggerState } from 'react-stately';

import { ModalProps } from './components/modal/modal.types.js';

export type BottomSheetProps = ModalProps & {
  /**
   * Body content of Bottom Sheet
   */
  children: ReactNode;
  /**
   * The Bottom Sheet opening and closing state, should use OverlayTriggerState from react-stately
   */
  state: OverlayTriggerState;
};

import { ReactNode } from 'react';
import { OverlayTriggerState } from 'react-stately';

import { ModalProps } from './components/bottom-sheet-modal/bottom-sheet-modal.types.js';

export type BottomSheetProps = ModalProps & {
  /**
   * Body content of Bottom Sheet
   */
  children: ReactNode;
  /**
   * Label for primary button
   */
  primaryLabel?: string;
  /**
   * onClick for primary button
   */
  primaryOnClick?: () => void;
  /**
   * Label for secondary button
   */
  secondaryLabel?: string;
  /**
   * onClick for secondary button
   */
  secondaryOnClick?: () => void;
  /**
   * The Bottom Sheet opening and closing state, should use OverlayTriggerState from react-stately
   */
  state: OverlayTriggerState;
  /**
   * Title for bottom sheet
   */
  title?: string;
};

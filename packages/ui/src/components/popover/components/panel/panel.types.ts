import { ReactNode } from 'react';
import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export type PanelProps = {
  /**
   * Children to render
   */
  children: ReactNode;
  /**
   * Overlay trigger state
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Overlay trigger state
   */
  state: OverlayTriggerState;
} & Omit<AriaPopoverProps, 'popoverRef' | 'isKeyboardDismissDisabled'>;

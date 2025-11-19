import { type AriaModalOverlayProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

import { ModalDialogProps } from '../index.js';

export type ModalBackdropProps = {
  /**
   * Inner part of backdrop
   */
  children: React.ReactNode;
  /**
   * Clasname
   */
  className?: string;
  /**
   * For medium and large sizes.
   * Keeps entire modal in view by adding internal scrolling.
   */
  compact?: boolean;
  /**
   * Element where backdrop will be placed
   */
  portalContainer?: Element;
  /**
   * size
   */
  size?: ModalDialogProps['size'];
  /**
   * OverlayTriggerState props
   */
  state: OverlayTriggerState;
  /**
   * zIndex of content inside
   */
  zIndex?: number;
} & AriaModalOverlayProps;

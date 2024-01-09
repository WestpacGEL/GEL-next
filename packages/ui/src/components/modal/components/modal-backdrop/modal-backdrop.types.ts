import { type AriaModalOverlayProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

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
   * Element where backdrop will be placed
   */
  portalContainer?: Element;
  /**
   * OverlayTriggerState props
   */
  state: OverlayTriggerState;
  /**
   * zIndex of content inside
   */
  zIndex?: number;
} & AriaModalOverlayProps;

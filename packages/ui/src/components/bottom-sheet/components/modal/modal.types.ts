import { CSSProperties, ReactNode } from 'react';
import { AriaModalOverlayProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalProps = AriaModalOverlayProps & {
  /**
   * Body content of Modal
   */
  children: ReactNode;
  /**
   * Height of the Modal
   */
  height?: CSSProperties['height'];
  /**
   * Element where the modal will be rendered, by default it will be into the body
   */
  portalContainer?: Element;
  /**
   * Size of the Modal
   */
  size?: Sizes;
  /**
   * The modal opening and closing state, should use OverlayTriggerState from react-stately
   */
  state: OverlayTriggerState;
  /**
   * Width of the Modal
   */
  width?: CSSProperties['width'];
};

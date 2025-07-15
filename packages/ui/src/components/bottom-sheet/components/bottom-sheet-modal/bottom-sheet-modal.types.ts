import { Property } from 'csstype';
import { ReactNode } from 'react';
import { AriaModalOverlayProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export type ModalProps = AriaModalOverlayProps & {
  /**
   * zIndex
   */
  zIndex?: number;
  /**
   * Body content of Modal
   */
  children: ReactNode;
  /**
   * Height of the Modal
   */
  height?: Property.Height;
  /**
   * Element where the modal will be rendered, by default it will be into the body
   */
  portalContainer?: Element;
  /**
   * The modal opening and closing state, should use OverlayTriggerState from react-stately
   */
  state: OverlayTriggerState;
  /**
   * Width of the Modal
   */
  width?: Property.Width;
};

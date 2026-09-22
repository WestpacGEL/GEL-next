import { type ReactNode, type RefObject } from 'react';
import { type AriaModalOverlayProps, type useModalOverlay } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

export type FlyoutBackdropRenderProps = {
  flyoutRef: RefObject<HTMLDivElement>;
  modalProps: ReturnType<typeof useModalOverlay>['modalProps'];
};

export type FlyoutBackdropProps = {
  /**
   * Function that renders the flyout dialog within the backdrop
   */
  children: (props: FlyoutBackdropRenderProps) => ReactNode;
  /**
   * Additional class name for the backdrop
   */
  className?: string;
  /**
   * Element where the backdrop will be rendered
   */
  portalContainer?: Element;
  /**
   * The flyout opening and closing state
   */
  state: OverlayTriggerState;
  /**
   * z-index of the backdrop
   * @default 100
   */
  zIndex?: number;
} & AriaModalOverlayProps;

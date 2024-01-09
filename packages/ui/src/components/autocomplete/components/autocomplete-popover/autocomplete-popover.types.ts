import { type HTMLAttributes, type ReactNode } from 'react';
import { type AriaPopoverProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

// @private
export type AutocompletePopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  /**
   * Popover content
   */
  children: ReactNode;
  /**
   * Classname
   */
  className?: string;
  /**
   * Popover ref
   */
  popoverRef?: React.RefObject<HTMLDivElement>;
  /**
   * Element where the popover will be rendered, by default it will be into the body
   */
  portalContainer?: Element;
  /**
   * Popover state
   */
  state: OverlayTriggerState;
} & HTMLAttributes<Element>;

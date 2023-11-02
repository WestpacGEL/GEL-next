import { HTMLAttributes, RefObject } from 'react';
import { OverlayTriggerState } from 'react-stately';

export type PanelProps = {
  /**
   * Content of popover
   */
  content: string;
  /**
   * Heading for popover box
   */
  heading?: string;
  /**
   * Tag to render
   */
  headingTag?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  /**
   * Placement of popover. If no placement provided it will default to top unless there is no space then will appear on bottom.
   */
  placement?: 'top' | 'bottom';
  /**
   * Overlay trigger state
   */
  state: OverlayTriggerState;
  /**
   * Ref for the trigger
   */
  triggerRef: RefObject<HTMLDivElement>;
} & HTMLAttributes<Element>;

export type Position = {
  arrowPosition?: number;
  offset?: 'left' | 'right';
  panelPosition?: number;
  placement?: 'top' | 'bottom';
};

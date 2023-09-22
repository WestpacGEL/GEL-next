import { HTMLAttributes } from 'react';
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
   * Overlay trigger state
   */
  placement?: 'top' | 'bottom';
  /**
   * Overlay trigger state
   */
  state: OverlayTriggerState;
} & HTMLAttributes<Element>;

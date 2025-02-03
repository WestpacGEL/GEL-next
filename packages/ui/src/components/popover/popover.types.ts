import { HTMLAttributes, ReactNode } from 'react';

import { ButtonProps } from '../button/index.js';
import { IconProps } from '../icon/icon.types.js';

import { PanelProps } from './components/panel/panel.types.js';

export type PopoverProps = {
  /**
   * Button text
   */
  children?: ReactNode;
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
   * @default h1
   */
  headingTag?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  /**
   * Use an icon as the button
   */
  icon?: (props: IconProps) => JSX.Element;
  /**
   * Removes padding from trigger button and sets look to link to be able to look inline, use size prop to match font size
   */
  linkStyling?: boolean;
  /**
   * A function for the onClick event
   */
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  /**
   * Whether popover is open by default
   */
  open?: boolean;
  /**
   * Placement of popover. If no placement provided it will default to top unless there is no space then will appear on bottom.
   * @default top
   */
  placement?: 'top' | 'bottom';
  /**
   * Renders the popover using a portal. You can either pass an HTML element to use as the portal container,
   * or a boolean value to use the document.body as the portal container.
   * @default false
   */
  portal?: PanelProps['portal'];
} & HTMLAttributes<Element> &
  Pick<ButtonProps, 'look' | 'soft' | 'size'>;

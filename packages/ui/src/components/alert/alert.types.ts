import React, { HTMLAttributes } from 'react';

export type Look = 'info' | 'success' | 'warning' | 'danger' | 'system';

export type AlertProps = {
  /**
   * The alert content
   */
  children?: React.ReactNode;
  /**
   * Enable dismissible mode
   * @default false
   */
  dismissible?: boolean;
  /**
   * The alert heading
   */
  heading?: string;
  /**
   * The alert heading tag is automatically defined, but may be overridden via this prop if required for semantic reasons.
   * @default h2
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Alert icon.
   *
   * The alert icon is automatically rendered based on look. The icon can be overriden via this prop, for info look alerts only.
   */
  icon?: React.ElementType;
  /**
   * The size of the alert icon.
   * @default undefined
   */
  iconSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'flex';
  /**
   * Alert look style
   * @default info
   */
  look?: Look;
  /**
   * Alert mode
   * @default box
   */
  mode?: 'box' | 'text';
  /**
   * onClose function for dismissible mode
   */
  onClose?: () => void;
  /**
   * Manually signal an open or close state of this alert
   */
  open?: boolean;
  /**
   * Tag to render
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

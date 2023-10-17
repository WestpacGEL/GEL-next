import { HTMLAttributes } from 'react';

export type Look = 'info' | 'success' | 'warning' | 'danger' | 'system';

export type AlertProps = {
  /**
   * Enable dismissible mode
   */
  dismissible?: boolean;
  /**
   * The alert heading
   */
  heading?: string;
  /**
   * The alert heading tag is automatically defined, but may be overridden via this prop if required for semantic reasons.
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Alert icon.
   *
   * The alert icon is automatically rendered based on look. The icon can be overriden via this prop, for info look alerts only.
   */
  icon?: React.ElementType;
  /**
   * Alert look style
   */
  look?: Look;
  /**
   * Alert mode
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
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;

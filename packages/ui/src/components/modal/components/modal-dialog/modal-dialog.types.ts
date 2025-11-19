import { RefObject } from 'react';
import { type AriaDialogProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './modal-dialog.styles.js';

type Variants = VariantProps<typeof styles>;

export type ModalDialogProps = {
  /**
   * Boolean to wrap all children into a ModalBody
   */
  body?: boolean;
  /**
   * Inner part of Dialog
   */
  children: React.ReactNode;
  /**
   * Additional className for Dialog
   */
  className?: string;
  /**
   * For medium and large sizes.
   * Keeps entire modal in view by adding internal scrolling.
   */
  compact?: boolean;
  /**
   * Full screen
   */
  fullscreen?: boolean;
  /**
   * onClose callback
   */
  onClose?: () => unknown;
  /**
   * Ref to use for scrolling animations when not using the ModalBody component or the body prop.
   * Ref should be the scrollable container that contains the content
   */
  scrollingBodyRef?: RefObject<HTMLDivElement>;
  /**
   * Size of dialog
   */
  size?: Variants['size'];
  /**
   * Title for Modal
   */
  title?: string;
} & AriaDialogProps;

export type ModalDialogContextValue = {
  /**
   * Whether container can scroll
   */
  canScroll?: boolean;
  /**
   * For medium and large sizes.
   * Keeps entire modal in view by adding internal scrolling.
   */
  compact?: boolean;
  /**
   * Size of dialog
   */
  size?: Variants['size'];
  /**
   * Ref to use for scrolling animations
   */
  scrollingRef?: RefObject<HTMLDivElement>;
};

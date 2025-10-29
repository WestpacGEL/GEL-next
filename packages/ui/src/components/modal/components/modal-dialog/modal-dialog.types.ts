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
   * Full screen
   */
  fullscreen?: boolean;
  /**
   * onClose callback
   */
  onClose?: () => unknown;
  /**
   * Ref to use for scrolling animations when not using the body prop to wrap children
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
   * Size of dialog
   */
  size?: Variants['size'];
  /**
   * Ref to use for scrolling animations when not using the body prop to wrap children
   */
  scrollingBodyRef?: RefObject<HTMLDivElement>;
};

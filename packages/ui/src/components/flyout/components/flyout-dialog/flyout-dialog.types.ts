import { type HTMLAttributes, type ReactNode, type RefObject } from 'react';
import { type AriaDialogProps, type useModalOverlay } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flyout-dialog.styles.js';

type Variants = VariantProps<typeof styles>;

export type FlyoutDialogProps = {
  /**
   * Flyout content
   */
  children?: ReactNode;
  /**
   * Assistive text for the close button
   * @default Close flyout
   */
  closeAssistiveText?: string;
  /**
   * The heading of the flyout
   */
  heading?: ReactNode;
  /**
   * The flyout heading tag may be overridden for semantic reasons
   * @default h2
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Called when the close button is pressed
   */
  onClose?: () => void;
  /**
   * Side of the page from which the flyout opens
   * @default right
   */
  position?: Variants['position'];
} & AriaDialogProps &
  HTMLAttributes<HTMLDivElement>;

export type FlyoutDialogInternalProps = FlyoutDialogProps & {
  flyoutRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  modalProps: ReturnType<typeof useModalOverlay>['modalProps'];
};

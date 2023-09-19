import { type AriaDialogProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './dialog.styles.js';

export type DialogProps = {
  /**
   * Boolean to wrap all children into a Modal.Body
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
   * onClose callback
   */
  onClose?: () => any;
  /**
   * Title for Modal
   */
  title?: string;
} & VariantProps<typeof styles> &
  AriaDialogProps;

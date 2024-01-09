import { type AriaDialogProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './modal-dialog.styles.js';

type Variants = VariantProps<typeof styles>;

export type ModalDialogProps = {
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
  onClose?: () => unknown;
  /**
   * Size of dialog
   */
  size?: Variants['size'];
  /**
   * Title for Modal
   */
  title?: string;
} & AriaDialogProps;

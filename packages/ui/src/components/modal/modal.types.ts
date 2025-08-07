import { type ModalBackdropProps, ModalDialogProps } from './components/index.js';

export type ModalProps = {
  /**
   * Whether the modal is fullscreen
   */
  fullscreen?: boolean;
} & ModalBackdropProps &
  Omit<ModalDialogProps, 'onClose'>;

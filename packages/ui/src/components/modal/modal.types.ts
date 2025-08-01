import { type ModalBackdropProps, ModalDialogProps } from './components/index.js';

export type ModalProps = {
  /**
   * onClose callback to be called when modal is closed (button, keystroke or interacting outside)
   */
  onClose?: () => unknown;
  /**
   * Whether the modal is fullscreen
   */
  fullscreen?: boolean;
} & ModalBackdropProps &
  Omit<ModalDialogProps, 'onClose'>;

import { type ModalBackdropProps, ModalDialogProps } from './components/index.js';

export type ModalProps = {
  /**
   * Provide inset styles for the backdrop for centering in certain containers
   */
  backdropStyle?: string;
  /**
   * Whether the modal is fullscreen
   */
  fullscreen?: boolean;
} & ModalBackdropProps &
  Omit<ModalDialogProps, 'onClose'>;

import { type ModalBackdropProps, ModalDialogProps } from './components/index.js';

export type ModalProps = ModalBackdropProps & ModalDialogProps & { fullscreen?: boolean };

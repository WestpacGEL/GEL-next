import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { type ModalBackdropProps, ModalDialogProps } from './components/index.js';

export type ModalProps = Omit<ModalBackdropProps, 'size'> &
  Omit<ModalDialogProps, 'onClose' | 'size'> & {
    /**
     * Provide inset styles for the backdrop for centering in certain containers
     */
    backdropStyle?: string;
    /**
     * Whether the modal is fullscreen
     */
    fullscreen?: boolean;
    /**
     * size
     */
    size?: ResponsiveVariants<ModalBackdropProps['size']>;
  };

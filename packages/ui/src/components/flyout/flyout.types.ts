import { type FlyoutBackdropProps, type FlyoutDialogProps } from './components/index.js';

export type FlyoutProps = Omit<FlyoutBackdropProps, 'children' | 'className'> &
  Omit<FlyoutDialogProps, 'onClose'> & {
    /**
     * Additional class name for the backdrop
     */
    backdropClassName?: string;
  };

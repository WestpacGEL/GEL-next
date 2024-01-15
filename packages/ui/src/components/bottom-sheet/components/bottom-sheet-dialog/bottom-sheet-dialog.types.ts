import { HTMLAttributes, ReactNode } from 'react';
import { AriaDialogProps } from 'react-aria';

export type DialogProps = AriaDialogProps & {
  children: ReactNode;
  onClose?: () => unknown;
  title?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

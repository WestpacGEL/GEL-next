import { HTMLAttributes, ReactNode } from 'react';

import { type ButtonProps } from '../../../../../button/index.js';

type ModalFooterButtonProps = Omit<ButtonProps, 'children' | 'onClick'>;

export type ModalDialogFooterProps = {
  /**
   * Footer content
   */
  children?: ReactNode;
  /**
   * Props passed to the primary button
   */
  primaryButtonProps?: ModalFooterButtonProps;
  /**
   * Label for primary button
   */
  primaryLabel: string;
  /**
   * onClick for primary button
   */
  primaryOnClick: () => void;
  /**
   * Props passed to the secondary button
   */
  secondaryButtonProps?: ModalFooterButtonProps;
  /**
   * Label for secondary button
   */
  secondaryLabel?: string;
  /**
   * onClick for secondary button
   */
  secondaryOnClick?: () => void;
} & HTMLAttributes<HTMLElement>;

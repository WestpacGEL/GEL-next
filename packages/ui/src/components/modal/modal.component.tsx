'use client';

import React from 'react';

import { ModalBackdrop, ModalDialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';

export function Modal({ children, title, role, body, size, className, fullSize, ...props }: ModalProps) {
  return (
    <ModalBackdrop size={size} {...props}>
      <ModalDialog
        fullSize={fullSize}
        onClose={props.isDismissable ? props.state.close : undefined}
        title={title}
        role={role}
        body={body}
        size={size}
        className={className}
      >
        {children}
      </ModalDialog>
    </ModalBackdrop>
  );
}
Modal.Footer = ModalDialog.Footer;
Modal.Body = ModalDialog.Body;

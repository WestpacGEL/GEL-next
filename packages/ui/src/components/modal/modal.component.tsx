'use client';

import React from 'react';

import { ModalBackdrop, ModalDialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';

export function Modal({ children, title, role, body, size, ...props }: ModalProps) {
  return (
    <ModalBackdrop {...props}>
      <ModalDialog
        onClose={props.isDismissable ? props.state.close : undefined}
        title={title}
        role={role}
        body={body}
        size={size}
      >
        {children}
      </ModalDialog>
    </ModalBackdrop>
  );
}
Modal.Footer = ModalDialog.Footer;
Modal.Body = ModalDialog.Body;

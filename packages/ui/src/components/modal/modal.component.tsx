import React from 'react';

import { Backdrop, Dialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';

export function Modal({ children, title, role, body, size, ...props }: ModalProps) {
  return (
    <Backdrop {...props}>
      <Dialog
        onClose={props.isDismissable ? props.state.close : undefined}
        title={title}
        role={role}
        body={body}
        size={size}
      >
        {children}
      </Dialog>
    </Backdrop>
  );
}
Modal.Footer = Dialog.Footer;
Modal.Body = Dialog.Body;

'use client';

import React, { useEffect, useState } from 'react';

import { ModalBackdrop, ModalDialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';

export function Modal({ children, title, role, body, size, className, fullscreen, onClose, ...props }: ModalProps) {
  const [wasOpen, setWasOpen] = useState(false);

  // React Aria does not include below functionality with useModalOverlay, this calls onClose correctly when the modal closes in any way
  useEffect(() => {
    if (props.state.isOpen) {
      setWasOpen(true);
    }
    if (!props.state.isOpen && wasOpen) {
      if (onClose) onClose();
      setWasOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.isOpen]);

  return (
    <ModalBackdrop size={size} {...props}>
      <ModalDialog
        fullscreen={fullscreen}
        onClose={props.isDismissable ? () => props.state.close() : undefined}
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

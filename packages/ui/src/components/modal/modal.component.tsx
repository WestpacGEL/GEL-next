'use client';

import React from 'react';

import { ModalBackdrop, ModalDialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';

export function Modal({
  children,
  backdropStyle,
  title,
  role,
  body,
  size,
  className,
  fullscreen,
  scrollingBodyRef,
  compact = false,
  ...props
}: ModalProps) {
  return (
    <ModalBackdrop size={size} className={backdropStyle} compact={compact} {...props}>
      <ModalDialog
        fullscreen={fullscreen}
        onClose={props.isDismissable ? () => props.state.close() : undefined}
        title={title}
        role={role}
        body={body}
        size={size}
        className={className}
        scrollingBodyRef={scrollingBodyRef}
        compact={compact}
      >
        {children}
      </ModalDialog>
    </ModalBackdrop>
  );
}

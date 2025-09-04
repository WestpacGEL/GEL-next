'use client';

import React from 'react';

import { ModalBackdrop, ModalDialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';

export function Modal({ children, title, role, body, size, className, fullscreen, ...props }: ModalProps) {
  const breakpoint = useBreakpoint();
  return (
    <ModalBackdrop size={resolveResponsiveVariant(size, breakpoint)} {...props}>
      <ModalDialog
        fullscreen={fullscreen}
        onClose={props.isDismissable ? () => props.state.close() : undefined}
        title={title}
        role={role}
        body={body}
        size={resolveResponsiveVariant(size, breakpoint)}
        className={className}
      >
        {children}
      </ModalDialog>
    </ModalBackdrop>
  );
}

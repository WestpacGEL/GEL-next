'use client';

import React from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

import { ModalBackdrop, ModalDialog } from './components/index.js';
import { type ModalProps } from './modal.types.js';

export function Modal({ children, backdropStyle, title, role, body, size, className, fullscreen, ...props }: ModalProps) {
  const breakpoint = useBreakpoint();
  return (
    <ModalBackdrop size={resolveResponsiveVariant(size, breakpoint)} className={backdropStyle} {...props}>
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

'use client';

import React, { useState, useEffect, useRef, Ref, useImperativeHandle, forwardRef } from 'react';

import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalBodyStyles } from './modal-dialog-body.styles.js';
import { type ModalDialogBodyProps } from './modal-dialog-body.types.js';

function BaseModalDialogBody({ className, children, ...props }: ModalDialogBodyProps, ref: Ref<HTMLDivElement>) {
  const { size } = useModalDialogContext();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollAtBottom, setScrollAtBottom] = useState(false);

  const handleScroll = () => {
    if (modalBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalBodyRef.current;
      setScrolled(scrollTop > 0);
      setScrollAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  const styles = modalBodyStyles({ size, canScroll, scrolled, scrollAtBottom });

  useEffect(() => {
    const bodyElement = modalBodyRef.current;

    if (bodyElement) {
      setCanScroll(bodyElement.scrollHeight > bodyElement.clientHeight);

      bodyElement.addEventListener('scroll', handleScroll);
      return () => {
        bodyElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => modalBodyRef.current!);

  return (
    <div className={styles.base({ className })} ref={modalBodyRef} {...props}>
      {children}
    </div>
  );
}

export const ModalDialogBody = forwardRef<HTMLDivElement, ModalDialogBodyProps>(BaseModalDialogBody);
ModalDialogBody.displayName = 'ModalDialogBody';

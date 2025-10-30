'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalBodyStyles } from './modal-dialog-body.styles.js';
import { type ModalDialogBodyProps } from './modal-dialog-body.types.js';

export function ModalDialogBody({ className, children, ...props }: ModalDialogBodyProps) {
  const { size, scrollingRef } = useModalDialogContext();
  const [canScroll, setCanScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollAtBottom, setScrollAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollingRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollingRef.current;
      setScrolled(scrollTop > 0);
      setScrollAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  }, [scrollingRef]);

  const styles = modalBodyStyles({ size, canScroll, scrolled, scrollAtBottom });

  useEffect(() => {
    const bodyElement = scrollingRef?.current;

    if (bodyElement) {
      setCanScroll(bodyElement.scrollHeight > bodyElement.clientHeight);

      bodyElement.addEventListener('scroll', handleScroll);
      return () => {
        bodyElement.removeEventListener('scroll', handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollingRef]);

  return (
    <div className={styles.base({ className })} ref={scrollingRef} {...props}>
      {children}
    </div>
  );
}

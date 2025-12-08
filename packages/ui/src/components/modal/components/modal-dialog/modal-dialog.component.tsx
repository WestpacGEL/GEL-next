'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDialog, useFocusRing } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';

import { ModalDialogBody } from './components/modal-dialog-body/index.js';
import { ModalDialogFooter } from './components/modal-dialog-footer/index.js';
import { styles as dialogStyles } from './modal-dialog.styles.js';
import { ModalDialogContextValue, type ModalDialogProps } from './modal-dialog.types.js';

const ModalDialogContext = createContext<ModalDialogContextValue>({ size: 'md' });

const SCROLL_BUFFER = 10;

export const useModalDialogContext = () => useContext(ModalDialogContext);

/**
 * @private
 */
export function ModalDialog({ className, body, onClose, size, compact, ...props }: ModalDialogProps) {
  const { children } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const [scrolled, setScrolled] = useState(false);
  const [scrollAtBottom, setScrollAtBottom] = useState(false);
  const styles = dialogStyles({ size, isFocusVisible, compact, scrolled });
  const [canScroll, setCanScroll] = useState(false);
  const [footerPresent, setFooterPresent] = useState<boolean>(false);

  const ref = useRef(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { dialogProps, titleProps } = useDialog(props, ref);

  const handleScroll = useCallback(() => {
    if (bodyRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
      setScrolled(scrollTop > SCROLL_BUFFER);
      setScrollAtBottom(scrollTop + clientHeight >= scrollHeight - SCROLL_BUFFER);
    }
  }, [bodyRef]);

  useEffect(() => {
    const bodyElement = bodyRef.current;

    if (!bodyElement) {
      setCanScroll(false);
      return;
    }

    bodyElement.addEventListener('scroll', handleScroll);

    const updateCanScroll = () => {
      setCanScroll(bodyElement.scrollHeight > bodyElement.clientHeight);
    };

    updateCanScroll();

    const resizeObserver = new ResizeObserver(() => {
      updateCanScroll();
    });
    resizeObserver.observe(bodyElement);

    return () => {
      resizeObserver.disconnect();
      bodyElement.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyRef]);

  return (
    <div {...dialogProps} ref={ref} className={styles.base({ className })}>
      {onClose && (
        <button className={styles.close()} onClick={onClose} aria-label="Close modal" {...focusProps}>
          <CloseIcon className="block" size="small" />
        </button>
      )}
      {props.title && (
        <h3 {...titleProps} className={styles.title()}>
          {props.title}
        </h3>
      )}

      <ModalDialogContext.Provider
        value={{ size, scrollingRef: bodyRef, canScroll, compact, footerPresent, setFooterPresent, scrollAtBottom }}
      >
        {body ? <ModalDialogBody>{children}</ModalDialogBody> : children}
      </ModalDialogContext.Provider>
    </div>
  );
}
ModalDialog.Body = ModalDialogBody;
ModalDialog.Footer = ModalDialogFooter;

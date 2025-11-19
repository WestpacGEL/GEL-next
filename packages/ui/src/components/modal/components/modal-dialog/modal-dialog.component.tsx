'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDialog, useFocusRing } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';

import { ModalDialogBody } from './components/modal-dialog-body/index.js';
import { ModalDialogFooter } from './components/modal-dialog-footer/index.js';
import { styles as dialogStyles } from './modal-dialog.styles.js';
import { ModalDialogContextValue, type ModalDialogProps } from './modal-dialog.types.js';

const ModalDialogContext = createContext<ModalDialogContextValue>({ size: 'md' });

export const useModalDialogContext = () => useContext(ModalDialogContext);
const SCROLL_PROGRESS_MAX = 0.1;
const SCROLL_PROGRESS_START = 0;
/**
 * @private
 */
export function ModalDialog({
  className,
  body,
  onClose,
  size = 'md',
  scrollingBodyRef,
  reducePadding,
  ...props
}: ModalDialogProps) {
  const { children } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = dialogStyles({ size, isFocusVisible, reducePadding });
  const [canScroll, setCanScroll] = useState(false);

  const ref = useRef(null);
  const bodyRef = useRef(null);

  const { dialogProps, titleProps } = useDialog(props, ref);
  const scrollingRef = scrollingBodyRef ?? bodyRef;

  useEffect(() => {
    const bodyElement = scrollingRef?.current;

    if (!bodyElement) {
      setCanScroll(false);
      return;
    }

    const updateCanScroll = () => {
      setCanScroll(bodyElement.scrollHeight > bodyElement.clientHeight);
    };

    updateCanScroll();

    // const resizeObserver = new ResizeObserver(() => {
    //   updateCanScroll();
    // });
    // resizeObserver.observe(bodyElement);

    // return () => {
    //   resizeObserver.disconnect();
    // };
  }, [scrollingRef]);

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

      <ModalDialogContext.Provider value={{ size, scrollingRef, reducePadding, canScroll }}>
        {body ? <ModalDialogBody>{children}</ModalDialogBody> : children}
      </ModalDialogContext.Provider>
    </div>
  );
}
ModalDialog.Body = ModalDialogBody;
ModalDialog.Footer = ModalDialogFooter;

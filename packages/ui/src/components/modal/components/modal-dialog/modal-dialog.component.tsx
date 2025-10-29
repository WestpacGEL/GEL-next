'use client';

import { useMotionValueEvent, useScroll, useTransform, m } from 'motion/react';
import React, { createContext, useContext, useRef, useState } from 'react';
import { useDialog, useFocusRing } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';

import { ModalDialogBody, ModalDialogBodyProps } from './components/modal-dialog-body/index.js';
import { ModalDialogFooter } from './components/modal-dialog-footer/index.js';
import { styles as dialogStyles } from './modal-dialog.styles.js';
import { ModalDialogContextValue, type ModalDialogProps } from './modal-dialog.types.js';

const ModalDialogContext = createContext<ModalDialogContextValue>({ size: 'md' });

export const useModalDialogContext = () => useContext(ModalDialogContext);
/**
 * @private
 */
export function ModalDialog({ className, body, onClose, size = 'md', scrollingBodyRef, ...props }: ModalDialogProps) {
  const { children } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = dialogStyles({ size, isFocusVisible });

  const ref = useRef(null);
  const bodyRef = useRef(null);

  const { dialogProps, titleProps } = useDialog(props, ref);
  const scrollingRef = scrollingBodyRef ?? bodyRef;
  const { scrollY } = useScroll({ container: scrollingRef.current ? scrollingRef : undefined });

  // Set initialPaddingTop based on size prop
  let initialPaddingTop: string;
  switch (size) {
    case 'lg':
      initialPaddingTop = '72px';
      break;
    case 'full':
      initialPaddingTop = '18px';
      break;
    case 'md':
    case 'sm':
    case 'fluid':
    default:
      initialPaddingTop = '54px';
      break;
  }

  const paddingTop = useTransform(scrollY, [0, 200], [initialPaddingTop, '12px']);
  const paddingBottom = useTransform(scrollY, [0, 200], [size === 'full' ? '18px' : '24px', '12px']);
  const [currPadding, setCurrPadding] = useState(''); // used for updating key so animation works

  useMotionValueEvent(paddingTop, 'change', latest => {
    setCurrPadding(latest);
  });
  return (
    <div {...dialogProps} ref={ref} className={styles.base({ className })}>
      {onClose && (
        <button className={styles.close()} onClick={onClose} aria-label="Close modal" {...focusProps}>
          <CloseIcon className="block" size="small" />
        </button>
      )}
      {props.title && (
        <m.div key={`title-${currPadding}`} style={{ paddingTop, paddingBottom }}>
          <h3 {...titleProps} className={styles.title()}>
            {props.title}
          </h3>
        </m.div>
      )}

      <ModalDialogContext.Provider value={{ size, scrollingBodyRef }}>
        {body ? <ModalDialogBody ref={bodyRef}>{children}</ModalDialogBody> : children}
      </ModalDialogContext.Provider>
    </div>
  );
}
ModalDialog.Body = (props: ModalDialogBodyProps) => <ModalDialogBody {...props} />;
ModalDialog.Footer = ModalDialogFooter;

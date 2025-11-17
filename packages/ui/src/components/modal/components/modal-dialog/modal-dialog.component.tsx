'use client';

import { useMotionValueEvent, useScroll, useTransform, m, HTMLMotionProps } from 'motion/react';
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
  // TODO: Handle resizing modal and scrolling
  const { children } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = dialogStyles({ size, isFocusVisible, reducePadding });
  const [canScroll, setCanScroll] = useState(false);

  const ref = useRef(null);
  const bodyRef = useRef(null);

  const { dialogProps, titleProps } = useDialog(props, ref);
  const scrollingRef = scrollingBodyRef ?? bodyRef;
  const { scrollYProgress } = useScroll({ container: scrollingRef.current ? scrollingRef : undefined });

  // pixel amounts based on spacing values
  let initialPaddingTop: string;
  switch (size) {
    case 'lg':
      initialPaddingTop = reducePadding ? '54px' : '72px';
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

  const paddingTop = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_START, SCROLL_PROGRESS_MAX],
    [initialPaddingTop, '16px'],
  );
  const paddingBottom = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_START, SCROLL_PROGRESS_MAX],
    [size === 'full' ? '18px' : '24px', '16px'],
  );
  const fontSize = useTransform(scrollYProgress, [SCROLL_PROGRESS_START, SCROLL_PROGRESS_MAX], ['1.5rem', '1.125rem']);
  const lineHeight = useTransform(scrollYProgress, [SCROLL_PROGRESS_START, SCROLL_PROGRESS_MAX], ['tight', 'normal']);

  const [currPadding, setCurrPadding] = useState(''); // used for updating key so animation works

  useMotionValueEvent(paddingTop, 'change', latest => {
    setCurrPadding(latest);
  });

  useEffect(() => {
    const bodyElement = scrollingRef?.current;

    if (bodyElement) {
      setCanScroll(bodyElement.scrollHeight > bodyElement.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollingRef]);

  const MotionHeading = m.create('h3');
  return (
    <div {...dialogProps} ref={ref} className={styles.base({ className })}>
      {onClose && (
        <button className={styles.close()} onClick={onClose} aria-label="Close modal" {...focusProps}>
          <CloseIcon className="block" size="small" />
        </button>
      )}
      {props.title &&
        (canScroll ? (
          <MotionHeading
            {...(titleProps as HTMLMotionProps<'h3'>)}
            className={styles.title()}
            key={`title-${currPadding}`}
            style={{ fontSize, lineHeight, paddingBottom, paddingTop }}
          >
            {props.title}
          </MotionHeading>
        ) : (
          <h3 {...titleProps} className={styles.title()}>
            {props.title}
          </h3>
        ))}

      <ModalDialogContext.Provider value={{ size, scrollingRef, reducePadding, canScroll }}>
        {body ? <ModalDialogBody>{children}</ModalDialogBody> : children}
      </ModalDialogContext.Provider>
    </div>
  );
}
ModalDialog.Body = ModalDialogBody;
ModalDialog.Footer = ModalDialogFooter;

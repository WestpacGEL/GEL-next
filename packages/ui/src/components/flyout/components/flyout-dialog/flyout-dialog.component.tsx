'use client';

import { useEnterAnimation } from '@react-aria/utils';
import { clsx } from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { mergeProps, useDialog } from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';

import { styles as dialogStyles } from './flyout-dialog.styles.js';
import { type FlyoutDialogInternalProps } from './flyout-dialog.types.js';

/**
 * @private
 */
export function FlyoutDialog({
  children,
  className,
  closeAssistiveText = 'Close flyout',
  flyoutRef,
  heading,
  headingTag: HeadingTag = 'h2',
  isOpen,
  modalProps,
  onClose,
  position = 'right',
  ...props
}: FlyoutDialogInternalProps) {
  const isEntering = useEnterAnimation(flyoutRef);
  const styles = dialogStyles({ isEntering, isOpen, position });
  const { dialogProps, titleProps } = useDialog(props, flyoutRef);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = listRef.current;
    if (!element) {
      return;
    }
    const listener = () => {
      const y = listRef.current?.scrollTop || 0;
      setScrolled(y > 0);
    };
    listRef?.current?.addEventListener('scroll', listener);
    return () => {
      listRef?.current?.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <div
      {...mergeProps(modalProps, dialogProps, props)}
      aria-hidden={!isOpen || undefined}
      className={styles.base({ className })}
      ref={flyoutRef}
    >
      <div className={styles.content()}>
        <div
          className={clsx(styles.header(), {
            'shadow-[0_2px_5px_rgba(0,0,0,0.3)]': scrolled,
          })}
        >
          {heading && (
            <HeadingTag {...titleProps} className={styles.heading()}>
              {heading}
            </HeadingTag>
          )}
          {onClose && (
            <Button
              aria-label={closeAssistiveText}
              className={styles.button()}
              iconAfter={() => <CloseIcon color="primary" size="medium" aria-hidden />}
              look="link"
              onClick={onClose}
              type="button"
            />
          )}
        </div>
        <div className={styles.body()} ref={listRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

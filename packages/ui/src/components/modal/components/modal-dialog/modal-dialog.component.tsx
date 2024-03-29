'use client';

import React, { createContext, useContext, useRef } from 'react';
import { useDialog, useFocusRing } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';

import { ModalDialogBody } from './components/modal-dialog-body/index.js';
import { ModalDialogFooter } from './components/modal-dialog-footer/index.js';
import { styles as dialogStyles } from './modal-dialog.styles.js';
import { ModalDialogContextValue, type ModalDialogProps } from './modal-dialog.types.js';

const ModalDialogContext = createContext<ModalDialogContextValue>({ size: 'md' });

export const useModalDialogContext = () => useContext(ModalDialogContext);
/**
 * @private
 */
export function ModalDialog({ className, body, onClose, size = 'md', ...props }: ModalDialogProps) {
  const { children } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = dialogStyles({ size, isFocusVisible });

  const ref = useRef(null);

  const { dialogProps, titleProps } = useDialog(props, ref);

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
      <ModalDialogContext.Provider value={{ size }}>
        {body ? <ModalDialogBody>{children}</ModalDialogBody> : children}
      </ModalDialogContext.Provider>
    </div>
  );
}

ModalDialog.Body = ModalDialogBody;
ModalDialog.Footer = ModalDialogFooter;

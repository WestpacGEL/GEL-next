import React, { useRef } from 'react';
import { useDialog, useFocusRing } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';

import { ModalDialogBody } from './components/modal-dialog-body/index.js';
import { ModalDialogFooter } from './components/modal-dialog-footer/index.js';
import { styles as dialogStyles } from './modal-dialog.styles.js';
import { type ModalDialogProps } from './modal-dialog.types.js';

export function ModalDialog({ className, body, onClose, size = 'md', ...props }: ModalDialogProps) {
  const { children } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = dialogStyles({ className, size, isFocusVisible });

  const ref = useRef(null);

  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className={styles.base()}>
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
      {body ? <ModalDialogBody>{children}</ModalDialogBody> : children}
    </div>
  );
}

ModalDialog.Body = ModalDialogBody;
ModalDialog.Footer = ModalDialogFooter;

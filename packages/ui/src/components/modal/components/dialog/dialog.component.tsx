import React, { useRef } from 'react';
import { useDialog, useFocusRing } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';

import { DialogBody } from './components/dialog-body/index.js';
import { DialogFooter } from './components/dialog-footer/index.js';
import { styles as dialogStyles } from './dialog.styles.js';
import { type DialogProps } from './dialog.types.js';

export function Dialog({ className, body, onClose, size = 'md', ...props }: DialogProps) {
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
      {body ? <DialogBody>{children}</DialogBody> : children}
    </div>
  );
}

Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

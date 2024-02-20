import { clsx } from 'clsx';
import React, { useRef } from 'react';
import { useDialog } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';
import { Button } from '../../../../components/index.js';

import { styles as bottomSheetDialogStyles } from './bottom-sheet-dialog.styles.js';
import { DialogProps } from './bottom-sheet-dialog.types.js';

export function BottomSheetDialog({
  children,
  title,
  className,
  onClose,
  primaryLabel,
  primaryOnClick,
  secondaryLabel,
  secondaryOnClick,
  ...props
}: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog({ ...props, role: 'dialog' }, ref);
  const styles = bottomSheetDialogStyles({});

  return (
    <div {...dialogProps} className={styles.base({ className })} ref={ref}>
      <header>
        <h3 className={styles.title()} {...titleProps}>
          {title}
        </h3>
        {onClose && (
          <Button size="small" look="link" onClick={onClose} aria-label="close" className={styles.closeBtn()}>
            <CloseIcon color="muted" size="small" />
          </Button>
        )}
      </header>
      <div className={styles.body()}>{children}</div>
      {(primaryLabel || secondaryLabel) && (
        <div className={styles.buttonWrapper()}>
          {primaryLabel && (
            <Button look="primary" size="large" className={styles.primaryBtn()} onClick={primaryOnClick}>
              {primaryLabel}
            </Button>
          )}
          {secondaryLabel && (
            <Button look="link" size="large" className={styles.secondaryBtn()} onClick={secondaryOnClick}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

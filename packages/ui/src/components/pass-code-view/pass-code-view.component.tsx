import React from 'react';

import { AlertIcon, PadlockIcon } from '../icon/index.js';
import { Button, Link } from '../index.js';
import { PassCode } from '../pass-code/pass-code.component.js';

import { PassCodeViewLoader } from './pass-code-view.loader.js';
import { styles as passCodeViewStyles } from './pass-code-view.styles.js';
import { type PassCodeViewProps } from './pass-code-view.types.js';

export function PassCodeView({
  className,
  tag: Tag = 'div',
  headerIcon: HeaderIcon = PadlockIcon,
  header,
  description,
  updateButtonLabel = 'update',
  resendButtonLabel = 'Resend code',
  onUpdate = () => {
    return;
  },
  onResend = () => {
    return;
  },
  onComplete = () => {
    return;
  },
  errorMessage,
  passCodeLength = 6,
  loading = false,
  ...props
}: PassCodeViewProps) {
  const styles = passCodeViewStyles({});

  return (
    <Tag className={styles.base({ className })} {...props}>
      {HeaderIcon && <HeaderIcon color="muted-vivid" className={styles.icon()} />}
      {header && <h3 className={styles.heading()}>{header}</h3>}
      {loading ? (
        <PassCodeViewLoader length={passCodeLength} />
      ) : (
        <>
          {description && (
            <p className="text-text-body">
              {description}
              <Link type="inline" className={styles.link()} onPress={onUpdate}>
                {updateButtonLabel}
              </Link>
            </p>
          )}
          {errorMessage && (
            <p className="mt-2 flex items-center gap-1 text-text-danger">
              <AlertIcon size="small" look="outlined" color="danger" />
              {errorMessage}
            </p>
          )}
          <PassCode className={styles.passCode()} length={passCodeLength} onComplete={onComplete} />
          {resendButtonLabel && (
            <Button look="link" onClick={onResend}>
              {resendButtonLabel}
            </Button>
          )}
        </>
      )}
    </Tag>
  );
}

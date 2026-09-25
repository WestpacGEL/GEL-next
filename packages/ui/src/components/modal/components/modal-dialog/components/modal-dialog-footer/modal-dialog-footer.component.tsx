'use client';

import React, { useEffect } from 'react';

import { useBreakpoint } from '../../../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../../../utils/breakpoint.util.js';
import { Button } from '../../../../../button/index.js';
import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalFooterStyles } from './modal-dialog-footer.styles.js';
import { type ModalDialogFooterProps } from './modal-dialog-footer.types.js';

export function ModalDialogFooter({
  className,
  primaryButtonProps,
  primaryLabel,
  primaryOnClick,
  secondaryButtonProps,
  secondaryLabel,
  secondaryOnClick,
  ...props
}: ModalDialogFooterProps) {
  const { size, compact, setFooterPresent } = useModalDialogContext();
  const breakpoint = useBreakpoint();

  const styles = modalFooterStyles({ size: resolveResponsiveVariant(size, breakpoint), compact });

  useEffect(() => {
    setFooterPresent?.(true);
  }, [setFooterPresent]);

  return (
    <div className={styles.base({ className })} {...props}>
      <Button
        {...primaryButtonProps}
        look={primaryButtonProps?.look ?? 'primary'}
        size={primaryButtonProps?.size ?? 'large'}
        className={styles.primaryBtn({ className: primaryButtonProps?.className })}
        onClick={primaryOnClick}
      >
        {primaryLabel}
      </Button>
      {secondaryLabel && (
        <Button
          {...secondaryButtonProps}
          look={secondaryButtonProps?.look ?? 'link'}
          size={secondaryButtonProps?.size ?? 'large'}
          className={styles.secondaryBtn({ className: secondaryButtonProps?.className })}
          onClick={secondaryOnClick}
        >
          {secondaryLabel}
        </Button>
      )}
    </div>
  );
}

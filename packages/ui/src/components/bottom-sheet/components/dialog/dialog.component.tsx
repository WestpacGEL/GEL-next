import { clsx } from 'clsx';
import React, { useRef } from 'react';
import { useDialog } from 'react-aria';

import { CloseIcon } from '../../../../components/icon/index.js';
import { Button } from '../../../../components/index.js';

import { DialogProps } from './dialog.types.js';

export function Dialog({ children, title, className, onClose, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog({ ...props, role: 'dialog' }, ref);

  return (
    <div
      {...dialogProps}
      className={clsx(
        className,
        'flex max-h-screen max-w-full flex-1 flex-col overflow-hidden rounded-t-md bg-white shadow-sm md:rounded-md',
      )}
      ref={ref}
    >
      <header className="flex flex-row justify-between px-4 py-5 md:px-15 md:py-5">
        <h3 className="typography-body-3 m-0 md:typography-body-2" {...titleProps}>
          {title}
        </h3>
        {onClose && (
          <Button size="small" look="link" onClick={onClose} aria-label="close">
            <CloseIcon color="primary" />
          </Button>
        )}
      </header>
      <div className="flex-1 overflow-auto px-4 pb-10 md:px-15">{children}</div>
    </div>
  );
}

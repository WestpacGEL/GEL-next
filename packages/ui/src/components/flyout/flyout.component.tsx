'use client';

import React from 'react';

import { Button } from '../button/index.js';
import { CloseIcon } from '../icon/index.js';

import { styles } from './flyout.styles.js';
import { type FlyoutProps } from './flyout.types.js';

export function Flyout({
  children,
  className,
  closeAssistiveText = 'Close flyout',
  heading,
  headingTag: HeadingTag = 'h2',
  onClose,
  open,
  position = 'right',
  style,
  tag: Tag = 'div',
  width,
  ...props
}: FlyoutProps) {
  const componentStyles = styles({ position });

  if (!open) {
    return null;
  }

  return (
    <Tag className={componentStyles.base({ className })} style={{ ...style, width }} {...props}>
      <div className={componentStyles.header()}>
        {heading && <HeadingTag className={componentStyles.heading()}>{heading}</HeadingTag>}
        <Button
          aria-label={closeAssistiveText}
          className={componentStyles.close()}
          look="unstyled"
          onClick={onClose}
          type="button"
        >
          <CloseIcon color="primary" size="medium" aria-hidden />
        </Button>
      </div>
      <div className={componentStyles.body()}>{children}</div>
    </Tag>
  );
}

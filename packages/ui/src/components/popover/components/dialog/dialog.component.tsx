import React, { useRef } from 'react';
import { useDialog } from 'react-aria';

import { styles as dialogStyles } from './dialog.styles.js';
import { type DialogProps } from './dialog.types.js';

export function Dialog({ children, heading, tag: Tag = 'h4', ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);
  const styles = dialogStyles({});

  return (
    <div ref={ref} className={styles.base()}>
      <Tag className={styles.heading()}>{heading}</Tag>
      <div className={styles.body()}>{children}</div>
    </div>
  );
}

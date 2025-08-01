import React, { useRef } from 'react';
import { useDialog } from 'react-aria';

import { DialogProps } from './dialog.types.js';

/**
 * @private
 */
export function Dialog({ title, children, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className="p-3">
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

import React from 'react';

import { styles as bodyStyles } from './panel-body.styles.js';
import { type PanelBodyProps } from './panel-body.types.js';

export function PanelBody({ className, children, ...props }: PanelBodyProps) {
  const styles = bodyStyles({});
  return (
    <div className={styles.base({ className })} {...props}>
      {children}
    </div>
  );
}

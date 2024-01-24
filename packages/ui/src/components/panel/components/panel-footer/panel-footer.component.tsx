import React from 'react';

import { styles as footerStyles } from './panel-footer.styles.js';
import { type PanelFooterProps } from './panel-footer.types.js';

export function PanelFooter({ className, children, ...props }: PanelFooterProps) {
  const styles = footerStyles();
  return (
    <div className={styles.base({ className })} {...props}>
      {children}
    </div>
  );
}

PanelFooter.displayName = 'PanelFooter';

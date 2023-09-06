import React from 'react';

import { styles as footerStyles } from './footer.styles.js';
import { type FooterProps } from './footer.types.js';

export function Footer({ className, children, ...props }: FooterProps) {
  const styles = footerStyles();
  return (
    <div className={styles.base({ className })} {...props}>
      {children}
    </div>
  );
}

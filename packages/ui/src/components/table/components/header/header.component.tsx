import React from 'react';

import { styles } from './header.styles.js';
import { type HeaderProps } from './header.types.js';

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <thead className={styles({ className })} {...props}>
      {children}
    </thead>
  );
}

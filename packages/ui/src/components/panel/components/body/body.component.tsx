import React from 'react';

import { styles as bodyStyles } from './body.styles.js';
import { type BodyProps } from './body.types.js';

export function Body({ className, children, ...props }: BodyProps) {
  const styles = bodyStyles({});
  return (
    <div className={styles.base({ className })} {...props}>
      {children}
    </div>
  );
}

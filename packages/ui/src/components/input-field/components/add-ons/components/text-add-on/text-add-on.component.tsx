import React from 'react';

import { styles } from './text-add-on.styles.js';
import { type TextAddOnProps } from './text-add-on.types.js';

export const TextAddOn = ({ position, className, size, id, children, ...props }: TextAddOnProps) => {
  return (
    <div id={`${id}-text-${position}`} className={styles({ className, position, size })} {...props}>
      {children}
    </div>
  );
};

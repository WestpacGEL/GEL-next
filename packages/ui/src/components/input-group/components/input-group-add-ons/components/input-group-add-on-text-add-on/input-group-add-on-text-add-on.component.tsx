import React from 'react';

import { styles } from './input-group-add-on-text-add-on.styles.js';
import { type InputGroupAddOnTextAddOnProps } from './input-group-add-on-text-add-on.types.js';

/**
 * @private
 */
export const InputGroupAddOnTextAddOn = ({
  position,
  className,
  size,
  id,
  children,
  ...props
}: InputGroupAddOnTextAddOnProps) => {
  return (
    <div id={`${id}-text-${position}`} className={styles({ className, position, size })} {...props}>
      {children}
    </div>
  );
};

import React from 'react';

import { styles } from './input-group-add-on-icon-add-on.styles.js';
import { type InputGroupAddOnIconAddOnProps } from './input-group-add-on-icon-add-on.types.js';

/**
 * @private
 */
export const InputGroupAddOnIconAddOn = ({
  position,
  children,
  size,
  className,
  ...props
}: InputGroupAddOnIconAddOnProps) => {
  return (
    <div className={styles({ className, size, position })} {...props}>
      {children}
    </div>
  );
};

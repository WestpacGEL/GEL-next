import React from 'react';

import { styles } from './input-group-add-on-default-add-on.styles.js';
import { type InputGroupAddOnDefaultAddOnProps } from './input-group-add-on-default-add-on.types.js';

/**
 * @private
 */
export const InputGroupAddOnDefaultAddOn = ({
  className,
  children,
  position,
  ...props
}: InputGroupAddOnDefaultAddOnProps) => {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
};

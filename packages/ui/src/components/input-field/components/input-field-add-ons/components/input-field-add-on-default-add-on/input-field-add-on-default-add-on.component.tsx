import React from 'react';

import { styles } from './input-field-add-on-default-add-on.styles.js';
import { type InputFieldAddOnDefaultAddOnProps } from './input-field-add-on-default-add-on.types.js';

/**
 * @private
 */
export const InputFieldAddOnDefaultAddOn = ({
  position,
  className,
  children,
  ...props
}: InputFieldAddOnDefaultAddOnProps) => {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
};

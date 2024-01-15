import React from 'react';

import { styles } from './input-field-add-on-icon-add-on.styles.js';
import { type InputFieldAddOnIconAddOnProps } from './input-field-add-on-icon-add-on.types.js';

/**
 * @private
 */
export const InputFieldAddOnIconAddOn = ({
  position,
  children,
  size,
  className,
  ...props
}: InputFieldAddOnIconAddOnProps) => {
  return (
    <div className={styles({ className, size, position })} {...props}>
      {children}
    </div>
  );
};

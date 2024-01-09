import React from 'react';

import { InputFieldAddOnDefaultAddOn, InputFieldAddOnIconAddOn, InputFieldAddOnTextAddOn } from './components/index.js';
import { styles } from './input-field-add-ons.styles.js';
import { InputFieldAddOnProps } from './input-field-add-ons.types.js';

/**
 * @private
 */
export const InputFieldAddOn = ({
  position,
  icon: Icon,
  iconProps = {},
  inset = false,
  children,
  size,
  id,
  ...props
}: InputFieldAddOnProps) => {
  const isInset = Icon ? true : inset;

  let Wrapper = InputFieldAddOnDefaultAddOn;
  const childrenIsString = typeof children === 'string';

  if (Icon) {
    Wrapper = InputFieldAddOnIconAddOn;
  } else if (typeof children === 'string') {
    Wrapper = InputFieldAddOnTextAddOn;
  }

  return (
    <Wrapper
      position={position}
      size={size}
      className={styles({ position, isInset })}
      id={childrenIsString ? id : undefined}
      {...props}
    >
      {Icon ? <Icon size="small" aria-hidden={true} {...iconProps} /> : children}
    </Wrapper>
  );
};

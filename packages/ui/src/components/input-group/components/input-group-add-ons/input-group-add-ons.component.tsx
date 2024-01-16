import React from 'react';

import { InputGroupAddOnDefaultAddOn, InputGroupAddOnIconAddOn, InputGroupAddOnTextAddOn } from './components/index.js';
import { styles } from './input-group-add-ons.styles.js';
import { InputGroupAddOnProps } from './input-group-add-ons.types.js';

/**
 * @private
 */
export const InputGroupAddOn = ({
  position,
  icon: Icon,
  iconProps = {},
  inset = false,
  children,
  size,
  id,
  ...props
}: InputGroupAddOnProps) => {
  const isInset = Icon ? true : inset;

  let Wrapper = InputGroupAddOnDefaultAddOn;
  const childrenIsString = typeof children === 'string';

  if (Icon) {
    Wrapper = InputGroupAddOnIconAddOn;
  } else if (typeof children === 'string') {
    Wrapper = InputGroupAddOnTextAddOn;
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

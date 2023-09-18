import React from 'react';

import { styles } from './add-ons.styles.js';
import { InputAddOnProps } from './add-ons.types.js';
import { DefaultAddOn, IconAddOn, TextAddOn } from './components/index.js';

export const InputAddOn = ({
  position,
  icon: Icon,
  iconProps = {},
  inset = false,
  children,
  size,
  id,
  ...props
}: InputAddOnProps) => {
  const isInset = Icon ? true : inset;

  let Wrapper = DefaultAddOn;
  const childrenIsString = typeof children === 'string';

  if (Icon) {
    Wrapper = IconAddOn;
  } else if (typeof children === 'string') {
    Wrapper = TextAddOn;
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

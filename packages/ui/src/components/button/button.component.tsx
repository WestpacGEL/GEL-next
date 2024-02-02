'use client';

import React, { forwardRef, useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles as buttonStyles } from './button.styles.js';
import { type ButtonProps } from './button.types.js';
import { getIconSize } from './button.utils.js';

function BaseButton(
  {
    className,
    size = 'medium',
    look = 'hero',
    soft,
    block = false,
    justify,
    tag: Tag = 'button',
    iconBefore: IconBefore,
    iconAfter: IconAfter,
    iconColor,
    children,
    ...props
  }: ButtonProps,
  ref: any,
) {
  const { isFocusVisible, focusProps } = useFocusRing();
  const iconSize = useMemo(() => getIconSize(size), [size]);
  const styles = buttonStyles({
    size,
    look,
    soft,
    block,
    justify,
    isFocusVisible,
    hasChildren: !!children,
  });

  return (
    <Tag ref={ref} className={styles.base({ className })} {...mergeProps(props, focusProps)}>
      {IconBefore && <IconBefore size={iconSize} className={styles.iconBefore()} color={iconColor} aria-hidden />}
      <span className={styles.text()}>{children}</span>
      {IconAfter && <IconAfter size={iconSize} className={styles.iconAfter()} color={iconColor} aria-hidden />}
    </Tag>
  );
}

export const Button = forwardRef(BaseButton);

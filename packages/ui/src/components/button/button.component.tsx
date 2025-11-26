'use client';

import React, { Ref, forwardRef, useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles as buttonStyles } from './button.styles.js';
import { type ButtonProps, ButtonRef } from './button.types.js';
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
    iconLook,
    iconColor,
    iconSize,
    children,
    removeLinkPadding,
    ...props
  }: ButtonProps,
  ref: Ref<ButtonRef>,
) {
  const { isFocusVisible, focusProps } = useFocusRing();
  const btnIconSize = useMemo(() => iconSize || getIconSize(size), [iconSize, size]);
  const styles = buttonStyles({
    size,
    look,
    soft,
    block,
    justify,
    isFocusVisible,
    hasChildren: !!children,
    removeLinkPadding,
  });

  return (
    <Tag ref={ref} className={styles.base({ className })} {...mergeProps(props, focusProps)}>
      {IconBefore && (
        <IconBefore look={iconLook} size={btnIconSize} className={styles.iconBefore()} color={iconColor} aria-hidden />
      )}
      <span className={styles.text()}>{children}</span>
      {IconAfter && (
        <IconAfter look={iconLook} size={btnIconSize} className={styles.iconAfter()} color={iconColor} aria-hidden />
      )}
    </Tag>
  );
}

export const Button = forwardRef(BaseButton);

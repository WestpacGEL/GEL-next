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
  });

  // eslint-disable-next-line sonarjs/function-return-type
  const finalIconColor = useMemo(() => {
    if (iconColor !== undefined) {
      return iconColor;
    }
    if (!soft && look === 'faint') {
      return 'muted';
    }
    if (!soft) {
      return 'mono';
    }
    switch (look) {
      case 'primary':
      case 'hero':
        return look;
      case 'faint':
        return 'muted';
      case 'link':
        return 'primary';
      case 'unstyled':
        return;
    }
  }, [iconColor, look, soft]);
  return (
    <Tag ref={ref} className={styles.base({ className })} {...mergeProps(props, focusProps)}>
      {IconBefore && (
        <IconBefore
          look={iconLook}
          size={btnIconSize}
          className={styles.iconBefore()}
          color={finalIconColor}
          aria-hidden
        />
      )}
      <span className={styles.text()}>{children}</span>
      {IconAfter && (
        <IconAfter
          look={iconLook}
          size={btnIconSize}
          className={styles.iconAfter()}
          color={finalIconColor}
          aria-hidden
        />
      )}
    </Tag>
  );
}

export const Button = forwardRef(BaseButton);

'use client';

import { type FocusableElement } from '@react-types/shared';
import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing, useLink, useObjectRef } from 'react-aria';

import { ArrowRightIcon } from '../icon/index.js';

import { styles as linkStyles } from './link.styles.js';
import { LinkComponent, LinkImplementationProps } from './link.types.js';

export function BaseLink(
  {
    className,
    children,
    href,
    tag: Tag,
    iconBefore: IconBefore,
    iconAfter: IconAfter,
    iconSize = 'small',
    target,
    type = 'standalone',
    underline = true,
    autoFocus,
    onBlur,
    onClick,
    onFocus,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    routerOptions,
    ...componentProps
  }: LinkImplementationProps,
  ref: ForwardedRef<unknown>,
) {
  const Component = Tag ?? 'a';
  const elementType = typeof Component === 'string' ? Component : 'a';
  const linkRef = useObjectRef(ref as ForwardedRef<FocusableElement>);
  const { linkProps } = useLink(
    {
      autoFocus,
      elementType,
      href: typeof href === 'string' ? href : undefined,
      onBlur,
      onClick,
      onFocus,
      onFocusChange,
      onKeyDown,
      onKeyUp,
      onPress,
      onPressChange,
      onPressEnd,
      onPressStart,
      onPressUp,
      routerOptions,
    },
    linkRef,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = linkStyles({ type, underline, isFocusVisible });

  if (type === 'standalone' && !IconBefore && !IconAfter) {
    IconBefore = ArrowRightIcon;
  }

  return (
    <Component
      {...componentProps}
      {...mergeProps(linkProps, focusProps)}
      ref={linkRef}
      href={href}
      target={target}
      className={styles.base({ className })}
    >
      {IconBefore && <IconBefore size={iconSize} color="primary" className={styles.iconBefore()} />}
      <span>{children}</span>
      {IconAfter && <IconAfter size={iconSize} color="primary" className={styles.iconAfter()} />}
    </Component>
  );
}

export const Link = forwardRef(BaseLink) as unknown as LinkComponent;

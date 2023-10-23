'use client';

import React, { forwardRef, useRef } from 'react';
import { mergeProps, useFocusRing, useLink } from 'react-aria';

import { ArrowRightIcon } from '../icon/index.js';

import { styles as linkStyles } from './link.styles.js';
import { type LinkProps } from './link.types.js';

export function BaseLink(
  {
    className,
    children,
    href,
    iconBefore: IconBefore,
    iconAfter: IconAfter,
    iconSize = 'small',
    target,
    type = 'standalone',
    underline = true,
    ...props
  }: LinkProps,
  propRef: any,
) {
  const ref = useRef(propRef);
  const { linkProps } = useLink({ ...props }, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = linkStyles({ type, underline, isFocusVisible });

  if (type === 'standalone' && !IconBefore && !IconAfter) {
    IconBefore = ArrowRightIcon;
  }

  return (
    <a
      {...mergeProps(linkProps, focusProps)}
      ref={propRef}
      href={href}
      target={target}
      className={styles.base({ className })}
    >
      {IconBefore && <IconBefore size={iconSize} color="link" className={styles.iconBefore()} />}
      <span>{children}</span>
      {IconAfter && <IconAfter size={iconSize} color="link" className={styles.iconAfter()} />}
    </a>
  );
}

export const Link = forwardRef(BaseLink);

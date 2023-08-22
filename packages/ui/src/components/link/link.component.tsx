import React, { useRef } from 'react';
import { useLink } from 'react-aria';

import { ArrowRightIcon } from '../icon/index.js';

import { styles as linkStyles } from './link.styles.js';
import { type LinkProps } from './link.types.js';

export function Link({
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
}: LinkProps) {
  const ref = useRef(null);
  const { linkProps } = useLink({ ...props }, ref);
  const styles = linkStyles({ type, underline });

  if (type === 'standalone' && !IconBefore && !IconAfter) {
    IconBefore = ArrowRightIcon;
  }

  return (
    <a {...linkProps} ref={ref} href={href} target={target} className={styles.base({ className })}>
      {IconBefore && <IconBefore size={iconSize} color="link" className={styles.iconBefore()} />}
      <span className={styles.text()}>{children}</span>
      {IconAfter && <IconAfter size={iconSize} color="link" className={styles.iconAfter()} />}
    </a>
  );
}
